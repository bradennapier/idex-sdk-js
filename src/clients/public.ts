import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import http from 'http';
import https from 'https';

import { isNode } from '../utils';
import { request, response } from '../types';

/**
 * Public API client
 *
 * @example
 * import * as idex from '@idexio/idex-sdk-js';
 *
 * // Edit the values below for your environment
 * const config = {
 *   baseURL: 'https://api-sandbox.idex.io/v1',
 *   apiKey: '1f7c4f52-4af7-4e1b-aa94-94fac8d931aa',
 * };
 *
 * const publicClient = new idex.PublicClient(config.baseURL);
 *
 * // Optionally provide an API key to increase rate limits
 * const publicClientWithApiKey = new idex.PublicClient(
 *   config.baseURL,
 *   config.apiKey,
 * );
 *
 * @param {string} baseUrl
 * @param {string} [apiKey] Increases rate limits if provided
 */
export default class PublicClient {
  public baseURL: string;

  private axios: AxiosInstance;

  public constructor(baseURL: string, apiKey?: string) {
    this.baseURL = baseURL;

    const headers = apiKey ? { Authorization: `Bearer ${apiKey}` } : null;
    this.axios = isNode
      ? Axios.create({
          headers,
          httpAgent: new http.Agent({ keepAlive: true }),
          httpsAgent: new https.Agent({ keepAlive: true }),
        })
      : Axios.create({
          headers,
        });
  }

  // Public Data Endpoints

  /**
   * Test connectivity to the REST API
   *
   * @see https://docs.idex.io/#get-ping
   */
  public async ping(): Promise<{ [key: string]: never }> {
    return (await this.get('/ping')).data;
  }

  /**
   * Returns the current server time
   *
   * @see https://docs.idex.io/#get-time
   *
   * @returns {Promise<number>} Current server time as milliseconds since UNIX epoch
   */
  public async getServerTime(): Promise<number> {
    return (await this.get('/time')).data.serverTime;
  }

  /**
   * Returns basic information about the exchange.
   *
   * @see https://docs.idex.io/#get-exchange
   *
   * @return {Promise<response.ExchangeInfo>}
   */
  public async getExchangeInfo(): Promise<response.ExchangeInfo> {
    return (await this.get('/exchange')).data;
  }

  /**
   * Returns information about assets supported by the exchange
   *
   * @see https://docs.idex.io/#get-assets
   *
   * @return {Promise<response.Asset[]>}
   */
  public async getAssets(): Promise<response.Asset[]> {
    return (await this.get('/assets')).data;
  }

  /**
   * Returns information about the currently listed markets
   *
   * @see https://docs.idex.io/#get-markets
   *
   * @param {FindMarkets} findMarkets
   * @return {Promise<response.Market[]>}
   */
  public async getMarkets(
    findMarkets: request.FindMarkets,
  ): Promise<response.Market[]> {
    return (await this.get('/markets', findMarkets)).data;
  }

  // Market Data Endpoints

  /**
   * Returns market statistics for the trailing 24-hour period
   *
   * @see https://docs.idex.io/#get-tickers
   *
   * @param {string} [market] - Base-quote pair e.g. 'IDEX-ETH', if provided limits ticker data to a single market
   * @return {Promise<response.Ticker[]>}
   */
  public async getTickers(market?: string): Promise<response.Ticker[]> {
    return (await this.get('/tickers', { market })).data;
  }

  /**
   * Returns candle (OHLCV) data for a market
   *
   * @see https://docs.idex.io/#get-candles
   *
   * @param {FindCandles} findCandles
   * @return {Promise<response.Candle[]>}
   */
  public async getCandles(
    findCandles: request.FindCandles,
  ): Promise<response.Candle[]> {
    return (await this.get('/candles', findCandles)).data;
  }

  /**
   * Returns public trade data for a market
   *
   * @see https://docs.idex.io/#get-trades
   *
   * @param {request.FindTrades} findTrades
   * @return {Promise<response.Trade[]>}
   */
  public async getTrades(
    findTrades: request.FindTrades,
  ): Promise<response.Trade[]> {
    return (await this.get('/trades', findTrades)).data;
  }

  /**
   * Get current top bid/ask price levels of order book for a market
   *
   * @see https://docs.idex.io/#get-order-books
   *
   * @param {string} market - Base-quote pair e.g. 'IDEX-ETH'
   * @return {Promise<response.OrderBookLevel1>}
   */
  public async getOrderBookLevel1(
    market: string,
  ): Promise<response.OrderBookLevel1> {
    return (await this.get('/orderbook', { level: 1, market })).data;
  }

  /**
   * Get current order book price levels for a market
   *
   * @see https://docs.idex.io/#get-order-books
   *
   * @param {string} market - Base-quote pair e.g. 'IDEX-ETH'
   * @param {number} [limit=50] - Number of bids and asks to return. Default is 50, 0 returns the entire book
   * @return {Promise<response.OrderBookLevel2>}
   */
  public async getOrderBookLevel2(
    market: string,
    limit = 50,
  ): Promise<response.OrderBookLevel2> {
    return (await this.get('/orderbook', { level: 2, market, limit })).data;
  }

  // Internal methods exposed for advanced usage

  protected async get(
    endpoint: string,
    requestParams: Record<string, any> = {}, // eslint-disable-line @typescript-eslint/no-explicit-any
  ): Promise<AxiosResponse> {
    return this.axios({
      method: 'GET',
      url: `${this.baseURL}${endpoint}`,
      params: requestParams,
    });
  }
}
