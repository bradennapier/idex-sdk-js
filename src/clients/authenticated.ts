import crypto from 'crypto';
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import http from 'http';
import https from 'https';
import queryString from 'query-string';

import * as signatures from '../signatures';
import { isNode } from '../utils';
import { request, response } from '../types';

/**
 * Authenticated API client
 *
 * @example
 * import { v1 as uuidv1 } from 'uuid';
 * import * as idex from '@idexio/idex-sdk-js';
 *
 * // Edit the values below for your environment
 * const config = {
 *   baseURL: 'https://api-sandbox.idex.io/v1',
 *   apiKey: '1f7c4f52-4af7-4e1b-aa94-94fac8d931aa',
 *   apiSecret: 'axuh3ywgg854aq7m73oy6gnnpj5ar9a67szuw5lclbz77zqu0j',
 *   walletPrivateKey: '0x3141592653589793238462643383279502884197169399375105820974944592'
 * };
 *
 * const authenticatedClient = new idex.AuthenticatedClient(
 *   config.baseURL,
 *   config.apiKey,
 *   config.apiSecret,
 * );
 */

export default class AuthenticatedClient {
  public baseURL: string;

  private axios: AxiosInstance;

  private apiSecret: string;

  public constructor(baseURL: string, apiKey: string, apiSecret: string) {
    this.baseURL = baseURL;
    this.apiSecret = apiSecret;

    this.axios = isNode
      ? Axios.create({
          headers: { Authorization: `Bearer ${apiKey}` },
          httpAgent: new http.Agent({ keepAlive: true }),
          httpsAgent: new https.Agent({ keepAlive: true }),
        })
      : Axios.create({
          headers: { Authorization: `Bearer ${apiKey}` },
        });
  }

  // User Data Endpoints

  /**
   * Get account details for the API key’s user
   *
   * @see https://docs.idex.io/#get-user-account
   *
   * @param {string} nonce - UUIDv1
   */
  public async getUser(nonce: string): Promise<response.User> {
    return (await this.get('/user', { nonce })).data;
  }

  /**
   * Get account details for the API key’s user
   *
   * @see https://docs.idex.io/#get-wallets
   *
   * @param {string} nonce - UUIDv1
   */
  public async getWallets(nonce: string): Promise<response.Wallet[]> {
    return (await this.get('/wallets', { nonce })).data;
  }

  /**
   * Get asset quantity data (positions) held by a wallet on the exchange
   *
   * @see https://docs.idex.io/#get-balances
   *
   * @param {request.FindBalances} findBalances
   */
  public async getBalances(
    findBalances: request.FindBalances,
  ): Promise<response.Balance[]> {
    return (await this.get('/balances', findBalances)).data;
  }

  // Orders & Trade Endpoints

  /**
   * Place a new order
   *
   * @example
   * const order = await authenticatedClient.createOrder(
   *   {
   *     nonce: uuidv1(),
   *     wallet: '0xA71C4aeeAabBBB8D2910F41C2ca3964b81F7310d',
   *     market: 'IDEX-ETH',
   *     type: 'limit',
   *     side: 'sell',
   *     price: '0.10000000',
   *     quantity: '1.50000000",
   *   },
   *   idex.signatures.privateKeySigner(config.walletPrivateKey),
   * );
   *
   * @see https://docs.idex.io/#create-order
   *
   * @param {request.Order} order
   * @param {signatures.MessageSigner} signer
   */
  public async createOrder(
    order: request.Order,
    signer: signatures.MessageSigner,
  ): Promise<response.Order> {
    return (
      await this.post('/orders', {
        parameters: order,
        signature: await signer(signatures.orderHash(order)),
      })
    ).data;
  }

  /**
   * Test new order creation, validation, and trading engine acceptance, but no order is placed or executed
   *
   * @example
   * const order = await authenticatedClient.createTestOrder(
   *   {
   *     nonce: uuidv1(),
   *     wallet: '0xA71C4aeeAabBBB8D2910F41C2ca3964b81F7310d',
   *     market: 'IDEX-ETH',
   *     type: 'limit',
   *     side: 'sell',
   *     price: '0.10000000',
   *     quantity: '1.50000000",
   *   },
   *   idex.signatures.privateKeySigner(config.walletPrivateKey),
   * );
   *
   * @see https://docs.idex.io/#test-create-order
   *
   * @param {request.Order} order
   * @param {signatures.MessageSigner} signer
   */
  public async createTestOrder(
    order: request.Order,
    signer: signatures.MessageSigner,
  ): Promise<response.Order> {
    return (
      await this.post('/orders/test', {
        parameters: order,
        signature: await signer(signatures.orderHash(order)),
      })
    ).data;
  }

  /**
   * Cancel a single order
   *
   * @example
   * const responseByOrderId = await authenticatedClient.cancelOrder(
   *   {
   *     nonce: uuidv1(),
   *     wallet: '0xA71C4aeeAabBBB8D2910F41C2ca3964b81F7310d',
   *     orderId: 'f077a010-ce18-11ea-9557-a9d3f954788d',
   *   },
   *   idex.signatures.privateKeySigner(config.walletPrivateKey),
   * );
   *
   * const clientOrderId = '0001_23234_18863_IDEX_ETH';
   * const responseByClientId = await authenticatedClient.cancelOrder(
   *   {
   *     nonce: uuidv1(),
   *     wallet: '0xA71C4aeeAabBBB8D2910F41C2ca3964b81F7310d',
   *     orderId: `client:${clientOrderId}`,
   *   },
   *   idex.signatures.privateKeySigner(config.walletPrivateKey),
   * );
   *
   * @see https://docs.idex.io/#cancel-order
   *
   * @param {string} cancelOrder
   * @param {signatures.MessageSigner} signer
   */
  public async cancelOrder(
    cancelOrder: request.CancelOrder,
    signer: signatures.MessageSigner,
  ): Promise<response.Order> {
    return (
      await this.delete('/orders', {
        parameters: cancelOrder,
        signature: await signer(signatures.cancelOrderHash(cancelOrder)),
      })
    ).data;
  }

  /**
   * Cancel multiple orders
   *
   * @example
   * const allOrders = users.trader1().client.cancelOrders(
   *   {
   *     nonce: uuidv1(),
   *     wallet: '0xA71C4aeeAabBBB8D2910F41C2ca3964b81F7310d',
   *   },
   *   idex.signatures.privateKeySigner(config.walletPrivateKey),
   * );
   *
   * const ordersfForMarket = users.trader1().client.cancelOrders(
   *   {
   *     nonce: uuidv1(),
   *     wallet: '0xA71C4aeeAabBBB8D2910F41C2ca3964b81F7310d',
   *     market: 'IDEX-ETH'
   *   },
   *   idex.signatures.privateKeySigner(config.walletPrivateKey),
   * );
   *
   * @see https://docs.idex.io/#cancel-order
   *
   * @param {string} order
   * @param {signatures.MessageSigner} signer
   */
  public async cancelOrders(
    cancelOrders: request.CancelOrders,
    signer: signatures.MessageSigner,
  ): Promise<response.Order[]> {
    return (
      await this.delete('/orders', {
        parameters: cancelOrders,
        signature: await signer(signatures.cancelOrderHash(cancelOrders)),
      })
    ).data;
  }

  /**
   * Get an order
   *
   * @see https://docs.idex.io/#get-orders
   *
   * @param {request.FindOrder} findOrder
   * @return {Promise<response.Order>}
   */
  public async getOrder(findOrder: request.FindOrder): Promise<response.Order> {
    return (await this.get('/orders', findOrder)).data;
  }

  /**
   * Get multiple orders
   *
   * @see https://docs.idex.io/#cancel-order
   *
   * @param {request.FindOrders} findOrders
   * @return {Promise<response.Order[]>}
   */
  public async getOrders(
    findOrders: request.FindOrders,
  ): Promise<response.Order[]> {
    return (await this.get('/orders', findOrders)).data;
  }

  /**
   * Get a fill
   *
   * @see https://docs.idex.io/#get-fills
   *
   * @param {request.FindFill} findFill
   * @return {Promise<response.Fill>}
   */
  public async getFill(findFill: request.FindFill): Promise<response.Fill> {
    return (await this.get('/fills', findFill)).data;
  }

  /**
   * Get multiple fills
   *
   * @see https://docs.idex.io/#get-fills
   *
   * @param {request.FindFills} findFills
   * @return {Promise<response.Fill[]>}
   */
  public async getFills(
    findFills: request.FindFills,
  ): Promise<response.Fill[]> {
    return (await this.get('/fills', findFills)).data;
  }

  // Deposit Endpoints

  /**
   * Get a deposit
   *
   * @see https://docs.idex.io/#get-deposits
   *
   * @param {request.FindDeposit} findDeposit
   * @return {Promise<response.Deposit>}
   */
  public async getDeposit(
    findDeposit: request.FindDeposit,
  ): Promise<response.Deposit> {
    return (await this.get('/deposits', findDeposit)).data;
  }

  /**
   * Get multiple deposits
   *
   * @see https://docs.idex.io/#get-deposits
   *
   * @param {request.FindDeposits} findDeposits
   * @return {Promise<response.Deposit[]>}
   */
  public async getDeposits(
    findDeposits: request.FindDeposits,
  ): Promise<response.Deposit[]> {
    return (await this.get('/deposits', findDeposits)).data;
  }

  // Withdrawal Endpoints
  /**
   * Get a withdrawal
   *
   * @see https://docs.idex.io/#get-withdrawals
   *
   * @param {request.FindWithdrawal} findWithdrawal
   * @return {Promise<response.Withdrawal>}
   */

  /**
   * Create a new withdrawal
   *
   * @example
   *
   * const withdrawal = await trader1.client.withdraw(
   *   {
   *     nonce: uuidv1(),
   *     wallet: '0xA71C4aeeAabBBB8D2910F41C2ca3964b81F7310d',
   *     asset: 'ETH',
   *     quantity: '0.04000000',
   *   },
   *   idex.signatures.privateKeySigner(config.walletPrivateKey),
   * );
   *
   * @see https://docs.idex.io/#withdraw-funds
   *
   * @param {request.Withdrawal} withdrawal
   * @param {signatures.MessageSigner} signer
   */
  public async withdraw(
    withdrawal: request.Withdrawal,
    signer: signatures.MessageSigner,
  ): Promise<response.Withdrawal> {
    return (
      await this.post('/withdrawals', {
        parameters: withdrawal,
        signature: await signer(signatures.withdrawalHash(withdrawal)),
      })
    ).data;
  }

  public async getWithdrawal(
    findWithdrawal: request.FindWithdrawal,
  ): Promise<response.Withdrawal> {
    return (await this.get('/withdrawals', findWithdrawal)).data;
  }

  /**
   * Get multiple withdrawals
   *
   * @see https://docs.idex.io/#get-withdrawals
   *
   * @param {request.FindWithdrawals} findWithdrawals
   * @return {Promise<response.Withdrawal[]>}
   */
  public async getWithdrawals(
    findWithdrawals: request.FindWithdrawals,
  ): Promise<response.Withdrawal[]> {
    return (await this.get('/withdrawals', findWithdrawals)).data;
  }

  // WebSocket Authentication Endpoints

  /**
   * Obtain a WebSocket API token
   *
   * @see https://docs.idex.io/#get-authentication-token
   *
   * @param {string} nonce - UUIDv1
   * @param {string} wallet - Ethereum wallet address
   */
  public async getWsToken(nonce: string, wallet: string): Promise<string> {
    return (await this.get('/wsToken', { nonce, wallet })).data.token;
  }

  // Internal methods exposed for advanced usage

  protected async get(
    endpoint: string,
    requestParams: Record<string, any> = {}, // eslint-disable-line @typescript-eslint/no-explicit-any
  ): Promise<AxiosResponse> {
    return this.axios({
      method: 'GET',
      url: `${this.baseURL}${endpoint}`,
      headers: this.createHmacRequestSignatureHeader(
        queryString.stringify(requestParams),
      ),
      params: requestParams,
    });
  }

  protected async post(
    endpoint: string,
    requestParams: Record<string, any> = {}, // eslint-disable-line @typescript-eslint/no-explicit-any
  ): Promise<AxiosResponse> {
    return this.axios({
      method: 'POST',
      url: `${this.baseURL}${endpoint}`,
      headers: this.createHmacRequestSignatureHeader(requestParams),
      data: requestParams,
    });
  }

  protected async delete(
    endpoint: string,
    requestParams: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
  ): Promise<AxiosResponse> {
    return this.axios({
      method: 'DELETE',
      url: `${this.baseURL}${endpoint}`,
      headers: this.createHmacRequestSignatureHeader(requestParams),
      data: requestParams,
    });
  }

  protected createHmacRequestSignatureHeader(
    payload: string | Record<string, unknown>,
  ): { 'hmac-request-signature': string } {
    const hmacRequestSignature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(typeof payload === 'string' ? payload : JSON.stringify(payload))
      .digest('hex');

    return { 'hmac-request-signature': hmacRequestSignature };
  }
}
