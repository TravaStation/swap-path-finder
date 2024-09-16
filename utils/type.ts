type EthAddress = string;

type StakingInfo = {
    exchangeRate: uint256;
    lastUpdateExchangeRate: uint256; // timestamp
    unbondingPeriod: uint256;
    exchangeRateTimeframe: uint256;
    exchangeRateThreshold: uint256;
}

type UnstakingRequest = {
    user: EthAddress;
    amount: uint256;
    ts: uint256; // timestamp
    isClaimed: boolean;
    returnAmount: uint256;
}

type bytes32 = string;
type bytes = string | Array<any>;
type uint256 = string;
type uint32 = string;
type uint160 = string;
type uint128 = string;
type uint80 = string;
type uint64 = string;
type uint24 = string;
type uint16 = string;
type uint8 = string;
type int256 = string;
type int24 = string;
export {
    StakingInfo,
    UnstakingRequest,
    EthAddress,
    bytes32,
    bytes,
    uint256,
    uint160,
    uint32,
    uint128,
    uint80,
    uint64,
    uint24,
    uint16,
    uint8,
    int256,
    int24,
};

export type UserReputation = [Array<uint256>, Array<uint256>];