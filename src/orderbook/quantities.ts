import {
  dividePips,
  oneInPips,
  MAX_64_BIT_INT,
  multiplyPips,
  pipToDecimal,
  squareRootBigInt,
} from './numbers';

import {
  BeforeComparison,
  GrossQuantities,
  OrderBookLevelL2,
  PoolReserveQuantities,
  L1OrderBook,
  L2OrderBook,
  SyntheticL2OrderBook,
} from '../types';

/*
 * internal helper functions
 */

const isAskBeforeOrEqual: BeforeComparison = function isAskBeforeOrEqual(
  a: OrderBookLevelL2,
  b: OrderBookLevelL2,
): boolean {
  return a.price <= b.price;
};

const isBidBeforeOrEqual: BeforeComparison = function isBidBeforeOrEqual(
  a: OrderBookLevelL2,
  b: OrderBookLevelL2,
): boolean {
  return a.price >= b.price;
};

// calculate total liquidity available to buy at a given price level (ask)
export const calculateBuyQuantitiesForTargetPrice = function calculateBuyQuantitiesForTargetPrice(
  baseAssetQuantity: bigint,
  quoteAssetQuantity: bigint,
  targetPrice: bigint,
  idexFeeRate: bigint,
  poolFeeRate: bigint,
): GrossQuantities {
  const grossQuote = calculateGrossQuoteQuantity(
    baseAssetQuantity,
    quoteAssetQuantity,
    targetPrice,
    idexFeeRate,
    poolFeeRate,
  );

  const idexFee = multiplyPips(grossQuote, idexFeeRate);
  const poolFee = multiplyPips(grossQuote, poolFeeRate);

  let netQuote =
    (grossQuote * (oneInPips - idexFeeRate - poolFeeRate)) / oneInPips;

  const baseOut =
    baseAssetQuantity -
    (baseAssetQuantity * quoteAssetQuantity) / (quoteAssetQuantity + netQuote);

  // new pool balances, including the retained pool fee
  const resultingBase = baseAssetQuantity - baseOut;
  const resultingQuote = quoteAssetQuantity + poolFee + netQuote;

  // fix quote quantity for constant pricing
  const resultingPrice = dividePips(resultingQuote, resultingBase);
  if (resultingPrice < targetPrice) {
    netQuote += multiplyPips(targetPrice, resultingBase, true) - resultingQuote;
  } else if (resultingPrice > targetPrice) {
    netQuote -= BigInt(1);
  }

  const grossQuoteIn = netQuote + poolFee + idexFee;
  return {
    grossBase: calculateGrossBaseValueOfBuyQuantities(
      baseAssetQuantity,
      quoteAssetQuantity,
      grossQuoteIn,
    ),
    grossQuote: grossQuoteIn,
  };
};

// calculate total liquidity available to buy at a given price level (bid)
export const calculateSellQuantitiesForTargetPrice = function calculateSellQuantitiesForTargetPrice(
  baseAssetQuantity: bigint,
  quoteAssetQuantity: bigint,
  targetPrice: bigint,
  idexFeeRate: bigint,
  poolFeeRate: bigint,
): GrossQuantities {
  const grossBase = calculateGrossBaseQuantity(
    baseAssetQuantity,
    quoteAssetQuantity,
    targetPrice,
    idexFeeRate,
    poolFeeRate,
  );

  return {
    grossBase,
    grossQuote: calculateGrossQuoteValueOfSellQuantities(
      baseAssetQuantity,
      quoteAssetQuantity,
      grossBase,
    ),
  };
};

// base quantity (for a sell)
export const calculateGrossBaseQuantity = function calculateGrossBaseQuantity(
  baseAssetQuantity: bigint,
  quoteAssetQuantity: bigint,
  targetPrice: bigint,
  idexFeeRate: bigint,
  poolFeeRate: bigint,
): bigint {
  validateSyntheticPriceLevelInputs(
    baseAssetQuantity,
    quoteAssetQuantity,
    targetPrice,
    false,
  );

  const poolFee =
    oneInPips - (oneInPips * poolFeeRate) / (oneInPips - idexFeeRate);
  const v0 = poolFee * baseAssetQuantity + oneInPips * baseAssetQuantity;
  const v1 =
    baseAssetQuantity * baseAssetQuantity -
    (oneInPips * baseAssetQuantity * quoteAssetQuantity) / targetPrice;
  const numerator =
    squareRootBigInt(v0 * v0 - BigInt(4) * poolFee * v1 * oneInPips) - v0;
  const denominator = BigInt(2) * poolFee * (oneInPips - idexFeeRate);

  return (numerator * oneInPips) / denominator;
};

// quote => base, for a buy
export const calculateGrossBaseValueOfBuyQuantities = function calculateGrossBaseValueOfBuyQuantities(
  baseAssetQuantity: bigint,
  quoteAssetQuantity: bigint,
  grossQuoteQuantity: bigint,
): bigint {
  return (
    baseAssetQuantity -
    (baseAssetQuantity * quoteAssetQuantity) /
      (quoteAssetQuantity + grossQuoteQuantity)
  );
};

// quote quantity (for a buy)
export const calculateGrossQuoteQuantity = function calculateGrossQuoteQuantity(
  baseAssetQuantity: bigint,
  quoteAssetQuantity: bigint,
  targetPrice: bigint,
  idexFeeRate: bigint,
  poolFeeRate: bigint,
): bigint {
  validateSyntheticPriceLevelInputs(
    baseAssetQuantity,
    quoteAssetQuantity,
    targetPrice,
    true,
  );

  const poolFee =
    oneInPips - (oneInPips * poolFeeRate) / (oneInPips - idexFeeRate);
  const v0 = oneInPips * quoteAssetQuantity * (poolFee + oneInPips);
  const v1 =
    quoteAssetQuantity *
    quoteAssetQuantity *
    (poolFee * poolFee +
      BigInt(2) * poolFee * oneInPips +
      oneInPips * oneInPips);
  const v2 =
    quoteAssetQuantity *
    (oneInPips * quoteAssetQuantity - baseAssetQuantity * targetPrice);
  const numerator =
    squareRootBigInt((v1 - BigInt(4) * poolFee * v2) * oneInPips * oneInPips) -
    v0;
  const denominator =
    BigInt(2) * poolFee * oneInPips - BigInt(2) * poolFee * idexFeeRate;
  return numerator / denominator;
};

// base => quote, for a sell
export const calculateGrossQuoteValueOfSellQuantities = function calculateGrossQuoteValueOfSellQuantities(
  baseAssetQuantity: bigint,
  quoteAssetQuantity: bigint,
  grossBaseQuantity: bigint,
): bigint {
  return (
    quoteAssetQuantity -
    (baseAssetQuantity * quoteAssetQuantity) /
      (baseAssetQuantity + grossBaseQuantity)
  );
};

export const calculateBaseQuantityOut = function calculateBaseQuantityOut(
  baseAssetQuantity: bigint,
  quoteAssetQuantity: bigint,
  grossQuoteQuantityIn: bigint,
  idexFeeRate: bigint,
  poolFeeRate: bigint,
): bigint {
  if (quoteAssetQuantity === BigInt(0) || grossQuoteQuantityIn === BigInt(0)) {
    return BigInt(0);
  }

  const numerator = baseAssetQuantity * quoteAssetQuantity * oneInPips;
  const denominator =
    quoteAssetQuantity * oneInPips +
    grossQuoteQuantityIn * (oneInPips - idexFeeRate - poolFeeRate);

  let quotient = numerator / denominator;
  if (quotient * denominator !== numerator) {
    quotient += BigInt(1);
  }

  return baseAssetQuantity - quotient;
};

export const calculateQuoteQuantityOut = function calculateQuoteQuantityOut(
  baseAssetQuantity: bigint,
  quoteAssetQuantity: bigint,
  grossBaseQuantityIn: bigint,
  idexFeeRate: bigint,
  poolFeeRate: bigint,
): bigint {
  if (baseAssetQuantity === BigInt(0) || grossBaseQuantityIn === BigInt(0)) {
    return BigInt(0);
  }
  /**
   * The result needs to be rounded down to prevent the pool's constant
   * product from decreasing, ie. the second part of the subtraction (the
   * division) needs to be rounded up.
   */
  const numerator = baseAssetQuantity * quoteAssetQuantity * oneInPips;
  const denominator =
    baseAssetQuantity * oneInPips +
    grossBaseQuantityIn * (oneInPips - idexFeeRate - poolFeeRate);

  let quotient = numerator / denominator;
  if (quotient * denominator !== numerator) {
    quotient += BigInt(1);
  }

  return quoteAssetQuantity - quotient;
};

export const calculateSyntheticPriceLevels = function calculateSyntheticPriceLevels(
  baseReserveQuantity: bigint,
  quoteReserveQuantity: bigint,
  visibleLevels: number,
  visibleSlippage: number,
  idexFeeRate = BigInt(0),
  poolFeeRate = BigInt(0),
): SyntheticL2OrderBook {
  const poolPrice = dividePips(quoteReserveQuantity, baseReserveQuantity);
  const priceSlippagePerLevel =
    (poolPrice * BigInt(visibleSlippage)) / BigInt(100000);
  const asks: OrderBookLevelL2[] = [];
  const bids: OrderBookLevelL2[] = [];

  let previousAskQuantityInBase = BigInt(0);
  let previousBidQuantityInBase = BigInt(0);

  for (let level = 1; level <= visibleLevels; level += 1) {
    const askPrice = poolPrice + BigInt(level) * priceSlippagePerLevel;

    const {
      grossBase: askQuantityInBase,
    } = quantitiesAvailableFromPoolAtAskPrice(
      baseReserveQuantity,
      quoteReserveQuantity,
      askPrice,
      idexFeeRate,
      poolFeeRate,
    );

    asks[level - 1] = {
      price: askPrice,
      size: askQuantityInBase - previousAskQuantityInBase,
      numOrders: 0,
      type: 'pool',
    };

    const bidPrice = poolPrice - BigInt(level) * priceSlippagePerLevel;

    if (bidPrice > BigInt(0)) {
      const {
        grossBase: bidQuantityInBase,
      } = quantitiesAvailableFromPoolAtBidPrice(
        baseReserveQuantity,
        quoteReserveQuantity,
        bidPrice,
        idexFeeRate,
        poolFeeRate,
      );

      bids[level - 1] = {
        price: bidPrice,
        size: bidQuantityInBase - previousBidQuantityInBase,
        numOrders: 0,
        type: 'pool',
      };

      previousBidQuantityInBase = bidQuantityInBase;
    }

    previousAskQuantityInBase = askQuantityInBase;
  }
  return {
    asks,
    bids,
    pool: {
      baseReserveQuantity,
      quoteReserveQuantity,
    },
  };
};

export const recalculateHybridLevelAmounts = function recalculateHybridLevelAmounts(
  orderbook: L2OrderBook,
  idexFeeRate: bigint,
  poolFeeRate: bigint,
): L2OrderBook {
  if (!orderbook.pool) {
    return orderbook;
  }
  // sanity for empty order books (which may list a "0" price level)
  while (orderbook.asks.length && orderbook.asks[0].price === BigInt(0)) {
    orderbook.asks.shift();
  }

  while (orderbook.bids.length && orderbook.bids[0].price === BigInt(0)) {
    orderbook.bids.shift();
  }

  let prevAskLevel = {
    price: BigInt(0),
    size: BigInt(0),
    type: 'pool',
  };

  for (const level of orderbook.asks) {
    // empty asks may be represented this way
    if (level.price === BigInt(0)) {
      break;
    }

    // limit levels always accrue pool liquidity from the previous level
    if (level.type === 'limit') {
      level.size =
        level.size +
        quantitiesAvailableFromPoolAtAskPrice(
          orderbook.pool.baseReserveQuantity,
          orderbook.pool.quoteReserveQuantity,
          level.price,
          idexFeeRate,
          poolFeeRate,
        ).grossBase -
        (prevAskLevel.price
          ? quantitiesAvailableFromPoolAtAskPrice(
              orderbook.pool.baseReserveQuantity,
              orderbook.pool.quoteReserveQuantity,
              prevAskLevel.price,
              idexFeeRate,
              poolFeeRate,
            ).grossBase
          : BigInt(0));
    }

    // this pool level was previously subdivided
    if (level.type === 'pool' && prevAskLevel.type !== 'pool') {
      level.size =
        quantitiesAvailableFromPoolAtAskPrice(
          orderbook.pool.baseReserveQuantity,
          orderbook.pool.quoteReserveQuantity,
          level.price,
          idexFeeRate,
          poolFeeRate,
        ).grossBase -
        quantitiesAvailableFromPoolAtAskPrice(
          orderbook.pool.baseReserveQuantity,
          orderbook.pool.quoteReserveQuantity,
          prevAskLevel.price,
          idexFeeRate,
          poolFeeRate,
        ).grossBase;
    }
    prevAskLevel = level;
  }

  let prevBidLevel = {
    price: BigInt(0),
    size: BigInt(0),
    type: 'pool',
  };

  for (const level of orderbook.bids) {
    // empty bids may be represented this way
    if (level.price === BigInt(0)) {
      break;
    }

    // limit levels always accrue pool liquidity from the previous level
    if (level.type === 'limit') {
      level.size =
        level.size +
        quantitiesAvailableFromPoolAtBidPrice(
          orderbook.pool.baseReserveQuantity,
          orderbook.pool.quoteReserveQuantity,
          level.price,
          idexFeeRate,
          poolFeeRate,
        ).grossBase -
        (prevBidLevel.price
          ? quantitiesAvailableFromPoolAtBidPrice(
              orderbook.pool.baseReserveQuantity,
              orderbook.pool.quoteReserveQuantity,
              prevBidLevel.price,
              idexFeeRate,
              poolFeeRate,
            ).grossBase
          : BigInt(0));
    }

    // this pool level was previously subdivided
    if (level.type === 'pool' && prevBidLevel.type !== 'pool') {
      level.size =
        quantitiesAvailableFromPoolAtBidPrice(
          orderbook.pool.baseReserveQuantity,
          orderbook.pool.quoteReserveQuantity,
          level.price,
          idexFeeRate,
          poolFeeRate,
        ).grossBase -
        (prevBidLevel.price
          ? quantitiesAvailableFromPoolAtBidPrice(
              orderbook.pool.baseReserveQuantity,
              orderbook.pool.quoteReserveQuantity,
              prevBidLevel.price,
              idexFeeRate,
              poolFeeRate,
            ).grossBase
          : BigInt(0));
    }
    prevBidLevel = level;
  }

  return orderbook;
};

export const sortAndMergeLevelsUnadjusted = function sortAndMergeLevelsUnadjusted(
  a: OrderBookLevelL2[],
  b: OrderBookLevelL2[],
  isBefore: BeforeComparison,
): OrderBookLevelL2[] {
  const c: OrderBookLevelL2[] = [];
  while (a.length && b.length) {
    if (a[0].price === b[0].price) {
      // equal price levels, combined them
      c.push({
        price: a[0].price,
        size: a[0].size + b[0].size,
        numOrders: a[0].numOrders,
        type: a[0].type !== b[0].type ? 'hybrid' : a[0].type,
      });
      a.shift();
      b.shift();
    } else if (isBefore(a[0], b[0])) {
      // a[0] comes first
      c.push(a[0]);
      a.shift();
    } else {
      // b[0] comes first
      c.push(b[0]);
      b.shift();
    }
  }
  return c.concat(a).concat(b);
};

export const quantitiesAvailableFromPoolAtAskPrice = function quantitiesAvailableFromPoolAtAskPrice(
  baseReserveQuantity: bigint,
  quoteReserveQuantity: bigint,
  askPrice: bigint,
  idexFeeRate: bigint,
  poolFeeRate: bigint,
): { grossBase: bigint; grossQuote: bigint } {
  // logger.server.debug('sdk target askPrice', askPrice);

  // if a limit order is equal to the pool price, the pool does not contribute
  if (askPrice === dividePips(quoteReserveQuantity, baseReserveQuantity)) {
    return {
      grossBase: BigInt(0),
      grossQuote: BigInt(0),
    };
  }

  return calculateBuyQuantitiesForTargetPrice(
    baseReserveQuantity,
    quoteReserveQuantity,
    askPrice,
    idexFeeRate,
    poolFeeRate,
  );
};

export const quantitiesAvailableFromPoolAtBidPrice = function quantitiesAvailableFromPoolAtBidPrice(
  baseReserveQuantity: bigint,
  quoteReserveQuantity: bigint,
  bidPrice: bigint,
  idexFeeRate: bigint,
  poolFeeRate: bigint,
): { grossBase: bigint; grossQuote: bigint } {
  // if a limit order is equal to the pool price, the pool does not contribute
  if (bidPrice === dividePips(quoteReserveQuantity, baseReserveQuantity)) {
    return {
      grossBase: BigInt(0),
      grossQuote: BigInt(0),
    };
  }

  return calculateSellQuantitiesForTargetPrice(
    baseReserveQuantity,
    quoteReserveQuantity,
    bidPrice,
    idexFeeRate,
    poolFeeRate,
  );
};

export function L1orL2BestAvailablePrices(
  pool: PoolReserveQuantities,
  idexFeeRate: bigint,
  poolFeeRate: bigint,
  takerMinimumInBase: bigint,
  takerMinimumInQuote: bigint,
): {
  baseReceived: bigint;
  bestAvailableBuyPrice: bigint;
  bestAvailableSellPrice: bigint;
  quoteReceived: bigint;
} {
  const takerMinimumInBaseAfterIdexFee = multiplyPips(
    takerMinimumInBase,
    oneInPips - idexFeeRate,
  );

  const takerMinimumInQuoteAfterIdexFee = multiplyPips(
    takerMinimumInQuote,
    oneInPips - idexFeeRate,
  );

  const baseReceived = calculateBaseQuantityOut(
    pool.baseReserveQuantity,
    pool.quoteReserveQuantity,
    takerMinimumInQuote,
    idexFeeRate,
    poolFeeRate,
  );

  const quoteReceived = calculateQuoteQuantityOut(
    pool.baseReserveQuantity,
    pool.quoteReserveQuantity,
    takerMinimumInBase,
    idexFeeRate,
    poolFeeRate,
  );

  // resulting price after a minimum buy
  const bestAvailableBuyPrice = dividePips(
    pool.quoteReserveQuantity + takerMinimumInQuoteAfterIdexFee,
    pool.baseReserveQuantity - baseReceived,
  );

  // resulting price after a minimum sell
  const bestAvailableSellPrice = dividePips(
    pool.quoteReserveQuantity - quoteReceived,
    pool.baseReserveQuantity + takerMinimumInBaseAfterIdexFee,
  );

  return {
    baseReceived,
    bestAvailableBuyPrice,
    bestAvailableSellPrice,
    quoteReceived,
  };
}

export function L1L2OrderBooksWithMinimumTaker(
  l2: L2OrderBook,
  idexFeeRate: bigint,
  poolFeeRate: bigint,
  takerMinimumInQuote: bigint,
): [L1OrderBook, L2OrderBook] {
  if (!l2.pool) {
    return [L2toL1OrderBook(l2), l2];
  }

  const l2Values = { ...l2 };
  const takerMinimumInBase =
    (takerMinimumInQuote * l2.pool.baseReserveQuantity) /
    l2.pool.quoteReserveQuantity;

  const {
    bestAvailableBuyPrice,
    bestAvailableSellPrice,
    quoteReceived,
  } = L1orL2BestAvailablePrices(
    l2.pool,
    idexFeeRate,
    poolFeeRate,
    takerMinimumInBase,
    takerMinimumInQuote,
  );

  if (!l2.asks[0] || bestAvailableBuyPrice < l2.asks[0].price) {
    l2Values.asks.unshift({
      price: bestAvailableBuyPrice,
      size: quoteReceived,
      numOrders: 0,
      type: 'pool',
    });
    if (l2Values.asks.length > 1) {
      l2Values.asks[1].size -= quoteReceived;
    }
  }

  if (!l2.bids[0] || bestAvailableSellPrice > l2.bids[0].price) {
    l2Values.bids.unshift({
      price: bestAvailableSellPrice,
      size: quoteReceived,
      numOrders: 0,
      type: 'pool',
    });
    if (l2Values.bids.length > 1) {
      l2Values.bids[1].size -= quoteReceived;
    }
  }

  return [L2toL1OrderBook(l2Values), l2Values];
}

export const L2LimitOrderBookToHybridOrderBooks = function L2LimitOrderBookToHybridOrderBooks(
  orderBook: L2OrderBook,
  visibleLevels = 10,
  visibleSlippage = 100,
  idexFeeRate: bigint,
  poolFeeRate: bigint,
  includeMinimumTakerLevels: boolean,
  minimumTakerInQuote: bigint,
): [L1OrderBook, L2OrderBook] {
  if (!orderBook.pool) {
    return [L2toL1OrderBook(orderBook), orderBook];
  }

  // this can happen if there is no currency conversion available
  if (minimumTakerInQuote === BigInt(0)) {
    includeMinimumTakerLevels = false; // eslint-disable-line
  }

  const synthetic = calculateSyntheticPriceLevels(
    orderBook.pool.baseReserveQuantity,
    orderBook.pool.quoteReserveQuantity,
    visibleLevels,
    visibleSlippage,
    idexFeeRate,
    poolFeeRate,
  );

  const adjustedL2OrderBook = recalculateHybridLevelAmounts(
    {
      sequence: orderBook.sequence,
      asks: sortAndMergeLevelsUnadjusted(
        orderBook.asks,
        synthetic.asks,
        isAskBeforeOrEqual,
      ),
      bids: sortAndMergeLevelsUnadjusted(
        orderBook.bids,
        synthetic.bids,
        isBidBeforeOrEqual,
      ),
      pool: {
        baseReserveQuantity: orderBook.pool.baseReserveQuantity,
        quoteReserveQuantity: orderBook.pool.quoteReserveQuantity,
      },
    },
    idexFeeRate,
    poolFeeRate,
  );

  return includeMinimumTakerLevels
    ? L1L2OrderBooksWithMinimumTaker(
        adjustedL2OrderBook,
        idexFeeRate,
        poolFeeRate,
        minimumTakerInQuote,
      )
    : [L2toL1OrderBook(adjustedL2OrderBook), adjustedL2OrderBook];
};

export const L2toL1OrderBook = function L2toL1OrderBook(
  l2: L2OrderBook,
): L1OrderBook {
  return {
    sequence: l2.sequence,
    asks: l2.asks[0],
    bids: l2.bids[0],
    pool: l2.pool,
  };
};

function validateSyntheticPriceLevelInputs(
  baseAssetQuantity: bigint,
  quoteAssetQuantity: bigint,
  targetPrice: bigint,
  isBuy: boolean,
): void {
  if (baseAssetQuantity < oneInPips || quoteAssetQuantity < oneInPips) {
    throw new Error(
      'Base asset quantity and quote asset quantity must be positive integers, for pools with at least 1 quote and 1 base token',
    );
  }

  if (targetPrice <= BigInt(0) || targetPrice > MAX_64_BIT_INT) {
    throw new Error(
      `Target price (${pipToDecimal(
        targetPrice,
      )}) must be above zero and below the 64 bit integer limit`,
    );
  }

  const currentPrice = dividePips(quoteAssetQuantity, baseAssetQuantity);
  if (isBuy && currentPrice >= targetPrice) {
    throw new Error(
      `Target price (${pipToDecimal(
        targetPrice,
      )}) must be above current price (${pipToDecimal(currentPrice)})`,
    );
  }

  if (!isBuy && currentPrice <= targetPrice) {
    throw new Error(
      `Target price (${pipToDecimal(
        targetPrice,
      )}) must be below current price (${pipToDecimal(currentPrice)})`,
    );
  }
}