import { KMSAccount } from "@fuels/kms-account";
import { Provider, Wallet } from "fuels";

export async function createAccount(key: string, providerUrl: string) {
    if (!key || !providerUrl) {
        throw new Error('Account key and provider URL are required!');
    }
    const provider = await Provider.create(providerUrl);
    const isKMS = key.startsWith('arn:');

    if (isKMS) {
        return KMSAccount.create(key, {}, provider);
    }

    return Wallet.fromPrivateKey(key, provider);
}