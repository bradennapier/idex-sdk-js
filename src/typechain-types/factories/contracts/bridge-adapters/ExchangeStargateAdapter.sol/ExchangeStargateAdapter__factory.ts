/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from 'ethers';
import type {
  Signer,
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from 'ethers';
import type { NonPayableOverrides } from '../../../../common';
import type {
  ExchangeStargateAdapter,
  ExchangeStargateAdapterInterface,
} from '../../../../contracts/bridge-adapters/ExchangeStargateAdapter.sol/ExchangeStargateAdapter';

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'custodian_',
        type: 'address',
      },
      {
        internalType: 'uint64',
        name: 'minimumWithdrawQuantityMultiplier_',
        type: 'uint64',
      },
      {
        internalType: 'address',
        name: 'router_',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'quoteAsset_',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'poolId',
        type: 'uint256',
      },
    ],
    name: 'InvalidSourcePoolId',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'destinationWallet',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'payload',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'errorData',
        type: 'bytes',
      },
    ],
    name: 'WithdrawQuoteAssetFailed',
    type: 'event',
  },
  {
    inputs: [],
    name: 'adminWallet',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'custodian',
    outputs: [
      {
        internalType: 'contract ICustodian',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'payload',
        type: 'bytes',
      },
      {
        internalType: 'uint64',
        name: 'quantity',
        type: 'uint64',
      },
      {
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
    ],
    name: 'estimateWithdrawQuantityInAssetUnitsAfterPoolFees',
    outputs: [
      {
        internalType: 'uint256',
        name: 'estimatedWithdrawQuantityInAssetUnits',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minimumWithdrawQuantityInAssetUnits',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'poolDecimals',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isDepositEnabled',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isWithdrawEnabled',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16[]',
        name: 'chainIds',
        type: 'uint16[]',
      },
    ],
    name: 'loadGasFeesInAssetUnits',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'gasFeesInAssetUnits',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minimumWithdrawQuantityMultiplier',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ownerWallet',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'quoteAsset',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'removeAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'removeOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'router',
    outputs: [
      {
        internalType: 'contract IStargateRouter',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newAdmin',
        type: 'address',
      },
    ],
    name: 'setAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'isEnabled',
        type: 'bool',
      },
    ],
    name: 'setDepositEnabled',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'newMinimumWithdrawQuantityMultiplier',
        type: 'uint64',
      },
    ],
    name: 'setMinimumWithdrawQuantityMultiplier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'isEnabled',
        type: 'bool',
      },
    ],
    name: 'setWithdrawEnabled',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amountLD',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'payload',
        type: 'bytes',
      },
    ],
    name: 'sgReceive',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'destinationWallet',
        type: 'address',
      },
    ],
    name: 'skimToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: 'destinationContractOrWallet',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
    ],
    name: 'withdrawNativeAsset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'destinationWallet',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'payload',
        type: 'bytes',
      },
    ],
    name: 'withdrawQuoteAsset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
] as const;

const _bytecode =
  '0x60e060409080825234620003945760808162002aa1803803809162000025828562000399565b83398101031262000394576200003b81620003d3565b60208281015190926001600160401b038216820362000394576200006f606062000067878401620003d3565b9201620003d3565b600080546001600160a01b031916331781556001549093919291853b1562000350576001600160a01b039586166080527fffff0000000000000000ffff000000000000000000000000000000000000000090911633600160b01b600160f01b0319161760b09190911b600160b01b600160f01b031617600155803b156200030c578316908160c052803b15620002c8578360049116938460a05285816080511688519384809263697b932d60e11b82525afa918215620002be5784926200027b575b5086518163095ea7b360e01b938483521660048201528681604481886000199a8b60248401525af1801562000271576044928895949287926200024f575b5060a05116895197889586948552600485015260248401525af19081156200024457506200020f575b825161269e9081620004038239608051818181610c7d0152818161129c015281816116b70152611ca4015260a05181818161015801528181610a610152610c05015260c0518181816102850152818161036e0152818161063a01528181610bce015281816113d10152818161152a015261163c0152f35b816200023392903d106200023c575b6200022a818362000399565b810190620003e8565b50388062000198565b503d6200021e565b8451903d90823e3d90fd5b6200026990873d89116200023c576200022a818362000399565b50386200016f565b88513d87823e3d90fd5b9091508581813d8311620002b6575b62000296818362000399565b81010312620002b257620002aa90620003d3565b903862000131565b8380fd5b503d6200028a565b87513d86823e3d90fd5b855162461bcd60e51b815260048101869052601b60248201527f496e76616c69642071756f7465206173736574206164647265737300000000006044820152606490fd5b855162461bcd60e51b815260048101869052601660248201527f496e76616c696420526f757465722061646472657373000000000000000000006044820152606490fd5b875162461bcd60e51b815260048101889052601960248201527f496e76616c696420437573746f6469616e2061646472657373000000000000006044820152606490fd5b600080fd5b601f909101601f19168101906001600160401b03821190821017620003bd57604052565b634e487b7160e01b600052604160045260246000fd5b51906001600160a01b03821682036200039457565b90816020910312620003945751801515810362000394579056fe6080604052600436101561001b575b361561001957600080fd5b005b6000803560e01c806313af403514611e705780631520322314611d93578063246f8b9614611d1a57806336b19cd714611cc8578063375b74c314611c59578063496b6abf14611a8e5780635656fc7814611a4a5780635b17d04b146119a45780636cbf8b82146111ff578063704b6c02146110dd578063880dc4e6146110995780639335dcb7146110485780639a202d4714610fcc5780639ec004a214610f255780639f78f2a614610edc578063ab8236f314610b2d578063b4306e8a14610571578063cab7283e146102a9578063f887ea401461023a578063f9ac07921461017f5763fdf262b71461010e575061000e565b3461017c57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c57602060405173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b80fd5b503461017c5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c5760043567ffffffffffffffff81168103610235577fffff0000000000000000ffffffffffffffffffffffffffffffffffffffffffff7dffffffffffffffff000000000000000000000000000000000000000000006001549261022873ffffffffffffffffffffffffffffffffffffffff851633146123c3565b60b01b1691161760015580f35b600080fd5b503461017c57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c57602060405173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b503461017c576020807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261056d5760043567ffffffffffffffff9182821161056957366023830112156105695781600401359283116105695760246005368286831b8601011161056557929491936103238161245b565b95610331604051978861202a565b81875261033d8261245b565b947fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe087890196013687373060601b907f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1690865b8581106103ef578a8a8a8a60405193838594850191818652518092526040850193925b8281106103d857505050500390f35b8351855286955093810193928101926001016103c9565b8781839c9a9b999c1b88818801013561ffff8116810361056157604090815190888d830152601482526104218261200e565b82519461042d86611faf565b8086528d86015261043c612210565b83860152610476835195869384937f0a512369000000000000000000000000000000000000000000000000000000008552600485016122e7565b0381885afa918215610556578d92610524575b508a518310156104f8578a018901527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146104cc5760010199969897996103a6565b868b7f4e487b710000000000000000000000000000000000000000000000000000000081526011600452fd5b888d7f4e487b710000000000000000000000000000000000000000000000000000000081526032600452fd5b61054791925060403d60401161054f575b61053f818361202a565b810190612249565b509038610489565b503d610535565b6040513d8f823e3d90fd5b8280fd5b8580fd5b8380fd5b5080fd5b503461017c5760607ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c5767ffffffffffffffff600435818111610561576105c29036906004016120ec565b60249391939182359284841684036102355760443573ffffffffffffffffffffffffffffffffffffffff93848216809203610235578701936106048589612428565b50919050604051957fc45a01550000000000000000000000000000000000000000000000000000000087526020968781600481867f0000000000000000000000000000000000000000000000000000000000000000165afa9081156109e457839189918991610af4575b5087604051809481937f068bcd8d000000000000000000000000000000000000000000000000000000008352896004840152165afa9081156109e4579083918891610ab6575b50169283158015610a1f575b6109ef57506040517f857749b00000000000000000000000000000000000000000000000000000000081528781600481875afa9081156109e45787916109b7575b5060ff811161093457610728889594939261072260ff60049416809c61252b565b9c612428565b9591969094604051938480927e1edfab0000000000000000000000000000000000000000000000000000000082525afa9182156109295788926108ec575b509160c094939160a49361ffff60405198899788967f1ab6243000000000000000000000000000000000000000000000000000000000885260048801528b87015216604485015260648401528c6084840152165afa9283156108e057809361082e575b50505061081c60609561080e6108088460406107ff6107f560806305f5e1009901518d85015190612473565b8984015190612473565b9101519061244e565b8261244e565b9560015460b01c1690612351565b04906040519384528301526040820152f35b9091925060c0823d82116108d8575b8161084a60c0938361202a565b8101031261017c57506040519160c0830190838210878311176108ab575060409081528151835283820151848401528082015190830152606080820151908301526080808201519083015260a0908101519082015261081c8561080e6107c9565b7f4e487b710000000000000000000000000000000000000000000000000000000060005260416004526000fd5b3d915061083d565b604051903d90823e3d90fd5b9091508881813d8311610922575b610904818361202a565b8101031261091e5751828116810361091e579060a4610766565b8780fd5b503d6108fa565b6040513d8a823e3d90fd5b608488602588604051927f08c379a000000000000000000000000000000000000000000000000000000000845260048401528201527f53616665436173743a2076616c756520646f65736e27742066697420696e203860448201527f20626974730000000000000000000000000000000000000000000000000000006064820152fd5b90508781813d83116109dd575b6109ce818361202a565b81010312610235575138610701565b503d6109c4565b6040513d89823e3d90fd5b8590604051907f6c0b55440000000000000000000000000000000000000000000000000000000082526004820152fd5b506040517ffc0c546a0000000000000000000000000000000000000000000000000000000081528881600481885afa908115610929578891610a89575b5083167f0000000000000000000000000000000000000000000000000000000000000000841614156106c0565b610aa99150893d8b11610aaf575b610aa1818361202a565b8101906121e4565b38610a5c565b503d610a97565b809250898092503d8311610aed575b610acf818361202a565b81010312610ae957518281168103610ae9578290386106b4565b8680fd5b503d610ac5565b92505081813d8311610b26575b610b0b818361202a565b81010312610ae957518281168103610ae9578783913861066e565b503d610b01565b503461017c5760c07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c5760043561ffff8116036102355767ffffffffffffffff9060243582811161056d57610b8c9036906004016120ec565b50506064359173ffffffffffffffffffffffffffffffffffffffff908184168094036102355760a43590811161056157610bca9036906004016120a5565b92817f0000000000000000000000000000000000000000000000000000000000000000163303610e7e5760ff60015460a01c1615610e2057817f00000000000000000000000000000000000000000000000000000000000000001603610dc25760209283818051810103126105615783015190808216809203610561578115610d645782936040517fd2f7265a0000000000000000000000000000000000000000000000000000000081528181600481867f0000000000000000000000000000000000000000000000000000000000000000165afa918215610d59578592610d3c575b505016803b15610d38576040517f6e553f65000000000000000000000000000000000000000000000000000000008152608435600482015273ffffffffffffffffffffffffffffffffffffffff92909216602483015282908290604490829084905af18015610d2d57610d1d5750f35b610d2690611ffa565b61017c5780f35b6040513d84823e3d90fd5b5050fd5b610d529250803d10610aaf57610aa1818361202a565b3880610cad565b6040513d87823e3d90fd5b606484604051907f08c379a00000000000000000000000000000000000000000000000000000000082526004820152601a60248201527f496e76616c69642064657374696e6174696f6e2077616c6c65740000000000006044820152fd5b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f496e76616c696420746f6b656e000000000000000000000000000000000000006044820152fd5b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f4465706f736974732064697361626c65640000000000000000000000000000006044820152fd5b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f43616c6c6572206d75737420626520526f7574657200000000000000000000006044820152fd5b503461017c57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c57602067ffffffffffffffff60015460b01c16604051908152f35b503461017c5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c5760043580151580910361056d577fffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffffff75ff00000000000000000000000000000000000000000060015492610fbf73ffffffffffffffffffffffffffffffffffffffff851633146123c3565b60a81b1691161760015580f35b503461017c57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c5761101d73ffffffffffffffffffffffffffffffffffffffff825416331461211a565b7fffffffffffffffffffffffff00000000000000000000000000000000000000006001541660015580f35b503461017c57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c5773ffffffffffffffffffffffffffffffffffffffff6020915416604051908152f35b503461017c57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c57602060ff60015460a81c166040519015158152f35b503461017c5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c57611115611f8c565b73ffffffffffffffffffffffffffffffffffffffff809161113a82855416331461211a565b169061114782151561217f565b600154908116821461117c577fffffffffffffffffffffffff0000000000000000000000000000000000000000161760015580f35b60846040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f4d75737420626520646966666572656e742066726f6d2063757272656e74206160448201527f646d696e000000000000000000000000000000000000000000000000000000006064820152fd5b503461017c5760607ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c57611237611f8c565b9060443567ffffffffffffffff811161056d576112589036906004016120a5565b916040517fd2f7265a00000000000000000000000000000000000000000000000000000000815260208160048173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000165afa908115611999579073ffffffffffffffffffffffffffffffffffffffff91849161197a575b5016330361191c576001549260ff8460a81c16156118be576060818051810103126105615760208101519361ffff851685036105695760408201516113b8606084015192604080517fffffffffffffffffffffffffffffffffffffffff0000000000000000000000008860601b166020820152601481526113638161200e565b81519061136f82611faf565b898252896020830152611380612210565b83830152825194859283927f0a5123690000000000000000000000000000000000000000000000000000000084528d600485016122e7565b038173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000165afa9182156109e4578792611888575b5061142067ffffffffffffffff6305f5e1009260b01c16602435612351565b046040519761142e89611faf565b8789528760208a015261143f612210565b60408a0152604051917fffffffffffffffffffffffffffffffffffffffff0000000000000000000000008860601b166020840152601483526114808361200e565b60405180602081011067ffffffffffffffff60208301111761185b57602081016040528981526040519a8b67ffffffffffffffff61014082818101109201111761182e57816101208d6101408e9f9e9b9c9d9e0160405288815261ffff871660208201528960408201528b606082015230608082015260243560a08201528560c08201528360e082015287610100820152015273ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000163b1561091e5761ffff946115c26115f292611623956040519c8d9b8c9a8b9a7f9fbf10fc000000000000000000000000000000000000000000000000000000008c521660048b015260248a01526044890152306064890152602435608489015260a488015261012060c48801526101248701906122bd565b907ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc8683030160e487015261225f565b907ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc8483030161010485015261225f565b039173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000165af1908161181b575b5061181657611672612393565b90836040517fd2f7265a00000000000000000000000000000000000000000000000000000000815260208160048173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000165afa8015610d2d5773ffffffffffffffffffffffffffffffffffffffff9183916117f7575b5016803b1561056d576040517f6e553f6500000000000000000000000000000000000000000000000000000000815260248035600483015273ffffffffffffffffffffffffffffffffffffffff8716908201529082908290604490829084905af18015610d2d576117df575b5050916117d973ffffffffffffffffffffffffffffffffffffffff926117cb7f3b33c49cc159e3f887c48e072a02de152e88f9c36c2bcf3f5f762317130ed60595604051958695168552602435602086015260806040860152608085019061225f565b90838203606085015261225f565b0390a180f35b6117eb90949294611ffa565b61056957918338611768565b611810915060203d602011610aaf57610aa1818361202a565b386116fc565b505080f35b61182790949194611ffa565b9238611665565b60248b7f4e487b710000000000000000000000000000000000000000000000000000000081526041600452fd5b60248a7f4e487b710000000000000000000000000000000000000000000000000000000081526041600452fd5b6305f5e10091925067ffffffffffffffff6118b46114209260403d60401161054f5761053f818361202a565b5093925050611401565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f57697468647261772064697361626c65640000000000000000000000000000006044820152fd5b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602060248201527f43616c6c6572206d7573742062652045786368616e676520636f6e74726163746044820152fd5b611993915060203d602011610aaf57610aa1818361202a565b386112e3565b6040513d85823e3d90fd5b503461017c5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c5760043580151580910361056d577fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff74ff000000000000000000000000000000000000000060015492611a3d73ffffffffffffffffffffffffffffffffffffffff851633146123c3565b60a01b1691161760015580f35b503461017c57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c57602060ff60015460a01c166040519015158152f35b503461017c5760407ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c57611ac6611f8c565b6024359073ffffffffffffffffffffffffffffffffffffffff9081831680930361056957611af9826001541633146123c3565b803b15611bfb5716906040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526020918282602481875afa908115610d595783928692611bc5575b506044908660405196879485937fa9059cbb000000000000000000000000000000000000000000000000000000008552600485015260248401525af1801561199957611b93578280f35b81813d8311611bbe575b611ba7818361202a565b8101031261056d57518015150361017c5738808280f35b503d611b9d565b8381949293503d8311611bf4575b611bdd818361202a565b81010312611bf057905182916044611b49565b8480fd5b503d611bd3565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f496e76616c696420746f6b656e206164647265737300000000000000000000006044820152fd5b503461017c57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c57602060405173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b503461017c57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c57602073ffffffffffffffffffffffffffffffffffffffff60015416604051908152f35b503461017c57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c577fffffffffffffffffffffffff00000000000000000000000000000000000000008154611d8d73ffffffffffffffffffffffffffffffffffffffff8216331461211a565b16815580f35b503461017c5760407ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c578060043573ffffffffffffffffffffffffffffffffffffffff90818116809103610d385782809291611dfb82936001541633146123c3565b602435905af1611e09612393565b5015611e125780f35b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4e6174697665206173736574207472616e73666572206661696c6564000000006044820152fd5b503461017c5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261017c57611ea8611f8c565b815473ffffffffffffffffffffffffffffffffffffffff80821692611ece84331461211a565b1691611edb83151561217f565b8214611f09577fffffffffffffffffffffffff00000000000000000000000000000000000000001617815580f35b60846040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f4d75737420626520646966666572656e742066726f6d2063757272656e74206f60448201527f776e6572000000000000000000000000000000000000000000000000000000006064820152fd5b6004359073ffffffffffffffffffffffffffffffffffffffff8216820361023557565b6060810190811067ffffffffffffffff821117611fcb57604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b67ffffffffffffffff8111611fcb57604052565b6040810190811067ffffffffffffffff821117611fcb57604052565b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff821117611fcb57604052565b67ffffffffffffffff8111611fcb57601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b81601f82011215610235578035906120bc8261206b565b926120ca604051948561202a565b8284526020838301011161023557816000926020809301838601378301015290565b9181601f840112156102355782359167ffffffffffffffff8311610235576020838186019501011161023557565b1561212157565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f43616c6c6572206d757374206265204f776e65722077616c6c657400000000006044820152fd5b1561218657565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f496e76616c69642077616c6c65742061646472657373000000000000000000006044820152fd5b90816020910312610235575173ffffffffffffffffffffffffffffffffffffffff811681036102355790565b6040519061221d8261200e565b600282527f30780000000000000000000000000000000000000000000000000000000000006020830152565b9190826040910312610235576020825192015190565b919082519283825260005b8481106122a95750507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8460006020809697860101520116010190565b60208183018101518483018201520161226a565b90606060406122e4938051845260208101516020850152015191816040820152019061225f565b90565b61230f6122e4949361ffff6040941683526001602084015260a08484015260a083019061225f565b90608083828403806060850152600285527f307800000000000000000000000000000000000000000000000000000000000060208601520191015201906122bd565b8181029291811591840414171561236457565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b3d156123be573d906123a48261206b565b916123b2604051938461202a565b82523d6000602084013e565b606090565b156123ca57565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f43616c6c6572206d7573742062652041646d696e2077616c6c657400000000006044820152fd5b9081606091031261023557803561ffff8116810361023557916040602083013592013590565b9190820391821161236457565b67ffffffffffffffff8111611fcb5760051b60200190565b9190820180921161236457565b801561252557600190602081108216604e821083161761251d578190600a925b8082116124d6575050817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048111612364570290565b9092807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04811161236457818416612514575b800292811c906124a0565b80920291612509565b9050600a0a90565b50600190565b9060ff16602081116125e4576008811161259a5760080360ff81116123645760ff6125569116612480565b90811561256b5767ffffffffffffffff160490565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8019060ff82116123645767ffffffffffffffff6125dd60ff6122e49416612480565b9116612351565b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602760248201527f41737365742063616e6e6f742068617665206d6f7265207468616e203332206460448201527f6563696d616c73000000000000000000000000000000000000000000000000006064820152fdfea264697066735822122029a5c1e8ac5239fff351b17dcb5ac37ec9984c0e8861dc6fbdc839e4957cda3c64736f6c63430008120033';

type ExchangeStargateAdapterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ExchangeStargateAdapterConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ExchangeStargateAdapter__factory extends ContractFactory {
  constructor(...args: ExchangeStargateAdapterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    custodian_: AddressLike,
    minimumWithdrawQuantityMultiplier_: BigNumberish,
    router_: AddressLike,
    quoteAsset_: AddressLike,
    overrides?: NonPayableOverrides & { from?: string },
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      custodian_,
      minimumWithdrawQuantityMultiplier_,
      router_,
      quoteAsset_,
      overrides || {},
    );
  }
  override deploy(
    custodian_: AddressLike,
    minimumWithdrawQuantityMultiplier_: BigNumberish,
    router_: AddressLike,
    quoteAsset_: AddressLike,
    overrides?: NonPayableOverrides & { from?: string },
  ) {
    return super.deploy(
      custodian_,
      minimumWithdrawQuantityMultiplier_,
      router_,
      quoteAsset_,
      overrides || {},
    ) as Promise<
      ExchangeStargateAdapter & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null,
  ): ExchangeStargateAdapter__factory {
    return super.connect(runner) as ExchangeStargateAdapter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ExchangeStargateAdapterInterface {
    return new Interface(_abi) as ExchangeStargateAdapterInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null,
  ): ExchangeStargateAdapter {
    return new Contract(
      address,
      _abi,
      runner,
    ) as unknown as ExchangeStargateAdapter;
  }
}