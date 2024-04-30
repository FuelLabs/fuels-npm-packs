import type { BN } from 'fuels';
import { Address, Wallet, Provider, bn } from 'fuels';

type SeedWalletOptions = {
  gasPrice?: number;
};

export async function seedWallet(
  address: string,
  amount: BN,
  fuelProviderUrl: string,
  genesisSecret: string,
  options: SeedWalletOptions = {},
) {
  const fuelProvider = await Provider.create(fuelProviderUrl);
  const gasPrice = await fuelProvider.getLatestGasPrice();
  const baseAssetId = fuelProvider.getBaseAssetId();
  const genesisWallet = Wallet.fromPrivateKey(genesisSecret!, fuelProvider);
  const response = await genesisWallet.transfer(
    Address.fromString(address),
    amount,
    baseAssetId,
    { gasPrice, gasLimit: bn(100_000), ...options },
  );
  await response.wait();
}
