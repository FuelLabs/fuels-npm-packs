import { QueryKey } from "@tanstack/react-query";

export const QUERY_KEYS = {
  base: ['fuel'] as QueryKey,
  account: (): QueryKey => {
    return [...QUERY_KEYS.base, 'account'];
  },
  accounts: (): QueryKey => {
    return [...QUERY_KEYS.base, 'accounts'];
  },
  assets: (): QueryKey => {
    return [...QUERY_KEYS.base, 'assets'];
  },
  chain: (): QueryKey => {
    return [...QUERY_KEYS.base, 'chain'];
  },
  isConnected: (): QueryKey => {
    return [...QUERY_KEYS.base, 'isConnected'];
  },
  provider: (): QueryKey => {
    return [...QUERY_KEYS.base, 'provider'];
  },
  balance: (): QueryKey => {
    return [...QUERY_KEYS.base, 'balance'];
  },
  wallet: (): QueryKey => {
    return [...QUERY_KEYS.base, 'wallet'];
  },
  transaction: (): QueryKey => {
    return [...QUERY_KEYS.base, 'transaction'];
  },
  transactionReceipts: (): QueryKey => {
    return [...QUERY_KEYS.base, 'transactionReceipts'];
  },
  nodeInfo: (): QueryKey => {
    return [...QUERY_KEYS.base, 'nodeInfo'];
  },
  connectorList: (): QueryKey => {
    return [...QUERY_KEYS.base, 'connectorList'];
  },
  currentConnector: (): QueryKey => {
    return [...QUERY_KEYS.base, 'currentConnector'];
  },
  currentNetwork: (): QueryKey => {
    return [...QUERY_KEYS.base, 'currentNetwork'];
  }
};

export const MUTATION_KEYS = {
  connect: 'connect',
  addAssets: 'addAssets',
  addNetwork: 'addNetwork',
};
