/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from 'ethers';
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from '../../../common';

export interface IStargateReceiverInterface extends Interface {
  getFunction(nameOrSignature: 'sgReceive'): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'sgReceive',
    values: [
      BigNumberish,
      BytesLike,
      BigNumberish,
      AddressLike,
      BigNumberish,
      BytesLike,
    ],
  ): string;

  decodeFunctionResult(functionFragment: 'sgReceive', data: BytesLike): Result;
}

export interface IStargateReceiver extends BaseContract {
  connect(runner?: ContractRunner | null): IStargateReceiver;
  waitForDeployment(): Promise<this>;

  interface: IStargateReceiverInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent,
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent,
  ): Promise<this>;

  sgReceive: TypedContractMethod<
    [
      chainId: BigNumberish,
      srcAddress: BytesLike,
      nonce: BigNumberish,
      token: AddressLike,
      amountLD: BigNumberish,
      payload: BytesLike,
    ],
    [void],
    'nonpayable'
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: 'sgReceive',
  ): TypedContractMethod<
    [
      chainId: BigNumberish,
      srcAddress: BytesLike,
      nonce: BigNumberish,
      token: AddressLike,
      amountLD: BigNumberish,
      payload: BytesLike,
    ],
    [void],
    'nonpayable'
  >;

  filters: {};
}