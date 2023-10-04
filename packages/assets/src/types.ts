export type Ethereum = {
  /** type of network */
  type: 'ethereum';
  /** chain id of the network */
  chainId: number;
  /** number of decimals of the asset */
  decimals: number;
  /** address of the asset contract */
  address?: string;
};

export type Fuel = {
  /** type of network */
  type: 'fuel';
  /** chain id of the network */
  chainId: number;
  /** number of decimals of the asset */
  decimals: number;
  /** assetId on the Fuel Network */
  assetId: string;
  /** the contractId of that generated the Asset on the Fuel Network */
  contractId?: string;
};

export type Asset = {
  /** name of the asset */
  name: string;
  /** description of the asset */
  description: string;
  /** symbol of the asset */
  symbol: string;
  /** icon of the asset */
  icon: string | null;
  /** asset id on Fuel Network */
  assetId: string;
  /** Networks are a representation of the asset on a specfic network */
  networks: Array<Ethereum | Fuel>;
};

export type Assets = Array<Asset>;
