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
  chainId?: number;
  networkType: T;
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

/**
 * Returns the asset with the network information based on the provided parameters.
 * @template T - The network type.
 * @param {GetAssetNetworkParams<T>} params - The parameters to get the asset with network information.
 * @returns {(AssetEth | AssetFuel | undefined)} - The asset with network information or undefined if not found.
 */
export const getAssetWithNetwork = <T extends NetworkTypes>({
  asset,
  chainId,
  networkType,
}: GetAssetNetworkParams<T>): AssetEth | AssetFuel | undefined => {
  const { networks: _, ...assetRest } = asset;

  const chainIdToUse = chainId ?? getDefaultChainId(networkType);
  // use two equals(==) cuz we wan't to keep 0 as a valid chainId
  if (chainIdToUse == undefined) return undefined;

  const assetNetwork = getAssetNetwork({
    asset,
    chainId: chainIdToUse,
    networkType,
  });

  if (!assetNetwork) return undefined;

  return {
    ...assetRest,
    ...assetNetwork,
  };
};

export const getAssetEth = (
  asset: Asset,
  chainId?: number,
): AssetEth | undefined => {
  return getAssetWithNetwork({
    asset,
    networkType: 'ethereum',
    chainId,
  }) as AssetEth;
};

export const getAssetFuel = (
  asset: Asset,
  chainId?: number,
): AssetFuel | undefined => {
  return getAssetWithNetwork({
    asset,
    networkType: 'fuel',
    chainId,
  }) as AssetFuel;
};
