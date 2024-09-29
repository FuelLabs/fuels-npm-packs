import type { KMSClientConfig } from '@aws-sdk/client-kms';
import type {
  BytesLike,
  CallResult,
  EstimateTransactionParams,
  Provider,
  ProviderSendTxParams,
  TransactionRequest,
  TransactionRequestLike,
  TransactionResponse,
} from 'fuels';
import { Account, hashMessage, hexlify, transactionRequestify } from 'fuels';

import { KMSSigner } from './signer';

export class KMSAccount extends Account {
  protected signer: KMSSigner;

  constructor(address: string, provider: Provider, signer: KMSSigner) {
    super(address, provider);
    this.signer = signer;
  }

  static async create(
    kmsKeyId: string,
    kmsClientConfig: KMSClientConfig,
    provider: Provider,
  ) {
    const kmsSigner = await KMSSigner.create(kmsKeyId, kmsClientConfig);
    return new KMSAccount(kmsSigner.address, provider, kmsSigner);
  }

  protected async _sign(digest: BytesLike): Promise<string> {
    return this.signer.sign(digest);
  }

  /**
   * All the code bellow is copied form WalletUnlocked from fuels
   */
  async signMessage(message: string): Promise<string> {
    const signedMessage = await this._sign(hashMessage(message));
    return hexlify(signedMessage);
  }

  async signTransaction(
    transactionRequestLike: TransactionRequestLike,
  ): Promise<string> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    const chainId = this.provider.getChainId();
    const hashedTransaction = transactionRequest.getTransactionId(chainId);
    const signature = await this._sign(hashedTransaction);
    return hexlify(signature);
  }

  async populateTransactionWitnessesSignature<T extends TransactionRequest>(
    transactionRequestLike: TransactionRequestLike,
  ) {
    const transactionRequest = transactionRequestify(
      transactionRequestLike,
    ) as T;
    const signedTransaction = await this.signTransaction(transactionRequest);

    transactionRequest.updateWitnessByOwner(this.address, signedTransaction);

    return transactionRequest;
  }

  async sendTransaction(
    transactionRequestLike: TransactionRequestLike,
    { estimateTxDependencies = false }: ProviderSendTxParams = {},
  ): Promise<TransactionResponse> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    if (estimateTxDependencies) {
      await this.provider.estimateTxDependencies(transactionRequest);
    }
    return this.provider.sendTransaction(
      await this.populateTransactionWitnessesSignature(transactionRequest),
      { estimateTxDependencies: false },
    );
  }

  async simulateTransaction(
    transactionRequestLike: TransactionRequestLike,
    { estimateTxDependencies = true }: EstimateTransactionParams = {},
  ): Promise<CallResult> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    if (estimateTxDependencies) {
      await this.provider.estimateTxDependencies(transactionRequest);
    }
    return this.provider.dryRun(
      await this.populateTransactionWitnessesSignature(transactionRequest),
      {
        utxoValidation: true,
        estimateTxDependencies: false,
      },
    );
  }
}
