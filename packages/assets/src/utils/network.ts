import { CHAIN_IDS } from '../constants';
import type { Asset, AssetEth, AssetFuel, Ethereum, Fuel } from '../types';

type Network = Ethereum | Fuel;
export type NetworkTypes = Ethereum['type'] | Fuel['type'];
type NetworkTypeToNetwork<T> = T extends 'ethereum'
  ? Ethereum
  : T extends 'fuel'
  ? Fuel
  : Network;

export const getDefaultChainId = (
  networkType: NetworkTypes,
): number | undefined => {
  if (networkType === 'ethereum') return CHAIN_IDS.eth.sepolia;
  if (networkType === 'fuel') return CHAIN_IDS.fuel.beta4;

  return undefined;
};

export type GetAssetNetworkParams<T extends NetworkTypes | undefined> = {
  asset: Asset;
  chainId: number;
  networkType?: T;
};

export const getAssetNetwork = <T extends NetworkTypes | undefined>({
  asset,
  chainId,
  networkType,
}: GetAssetNetworkParams<T>): NetworkTypeToNetwork<T> => {
  const network = asset.networks.find(
    (network) => network.chainId === chainId && network.type === networkType,
  ) as NetworkTypeToNetwork<T>;

  return network;
};

export const getAssetEth = (
  asset: Asset,
  chainId?: number,
): AssetEth | undefined => {
  const { networks: _, ...assetRest } = asset;

  const chainIdToUse = chainId ?? getDefaultChainId('ethereum');
  if (!chainIdToUse) return undefined;

  const assetNetwork = getAssetNetwork({
    asset,
    chainId: chainIdToUse,
    networkType: 'ethereum',
  });

  if (!assetNetwork) return undefined;

  return {
    ...assetRest,
    ...assetNetwork,
  };
};

export const getAssetFuel = (
  asset: Asset,
  chainId: number,
): AssetFuel | undefined => {
  const { networks: _, ...assetRest } = asset;

  const chainIdToUse = chainId ?? getDefaultChainId('fuel');
  if (!chainIdToUse) return undefined;

  const assetNetwork = getAssetNetwork({
    asset,
    chainId,
    networkType: 'fuel',
  });

  if (!assetNetwork) return undefined;

  return {
    ...assetRest,
    ...assetNetwork,
  };
};
