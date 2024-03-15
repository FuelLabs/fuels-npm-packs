import type { QueryKey } from '@tanstack/react-query';
import type { BytesLike } from 'fuels';

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
  balance: (address?: string, assetId?: BytesLike): QueryKey => {
    const queryKey = [...QUERY_KEYS.base, 'balance'];
    if (address) queryKey.push(address);
    if (assetId) queryKey.push(assetId);
    return queryKey;
  },
  wallet: (address?: string | null): QueryKey => {
    const queryKey = [...QUERY_KEYS.base, 'wallet'];
    if (address) queryKey.push(address);
    return queryKey;
  },
  transaction: (id?: string): QueryKey => {
    const queryKey = [...QUERY_KEYS.base, 'transaction'];
    if (id) queryKey.push(id);
    return queryKey;
  },
  transactionReceipts: (id?: string): QueryKey => {
    const queryKey = [...QUERY_KEYS.base, 'transactionReceipts'];
    if (id) queryKey.push(id);
    return queryKey;
  },
  nodeInfo: (url?: string): QueryKey => {
    const queryKey = [...QUERY_KEYS.base, 'nodeInfo'];
    if (url) queryKey.push(url);
    return queryKey;
  },
  connectorList: (): QueryKey => {
    return [...QUERY_KEYS.base, 'connectorList'];
  },
  currentConnector: (): QueryKey => {
    return [...QUERY_KEYS.base, 'currentConnector'];
  },
  currentNetwork: (): QueryKey => {
    return [...QUERY_KEYS.base, 'currentNetwork'];
  },
};

export const MUTATION_KEYS = {
  connect: 'connect',
  addAssets: 'addAssets',
  addNetwork: 'addNetwork',
};
