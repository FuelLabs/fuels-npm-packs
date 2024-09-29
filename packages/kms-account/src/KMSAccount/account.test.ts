import {
  GetPublicKeyCommand,
  KMSClient,
  SignCommand,
} from '@aws-sdk/client-kms';
import { secp256k1 } from '@noble/curves/secp256k1';
import { mockClient } from 'aws-sdk-client-mock';
import { Address, bn, concat, hashMessage, Signer } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';
import { test, describe, expect, beforeAll } from 'vitest';

import { KMSAccount } from './account';

const MOCK_HEADER_PUBLIC_KEY =
  '0x3056301006072a8648ce3d020106052b8104000a034200';

describe('KMSAccount', () => {
  // TODO: implement test for sign using mocked implementation
  beforeAll(() => {
    const kmsClientMock = mockClient(KMSClient);
    const priv = secp256k1.utils.randomPrivateKey();
    const pubKey = secp256k1.getPublicKey(priv, false);
    const publicKeyASN1 = concat([MOCK_HEADER_PUBLIC_KEY, pubKey]);

    kmsClientMock.on(GetPublicKeyCommand).resolves({
      PublicKey: publicKeyASN1,
    });

    kmsClientMock.on(SignCommand).callsFake((params) => {
      const { SigningAlgorithm, MessageType, Message } = params;
      if (SigningAlgorithm === 'ECDSA_SHA_256' && MessageType === 'DIGEST') {
        const signature = secp256k1.sign(Message, priv).toDERRawBytes(false);
        return {
          Signature: signature,
        };
      }
      return {};
    });
  });

  test('should be able to create a KMSAccount', async () => {
    using launched = await launchTestNode();
    const account = await KMSAccount.create('mock-id', {}, launched.provider);
    expect(account.address).toBeDefined();
  });

  test('should be able to sign a message', async () => {
    using launched = await launchTestNode();
    const account = await KMSAccount.create('mock-id', {}, launched.provider);
    const message = 'Hello, world!';
    const signature = await account.signMessage(message);
    const recoveredAddress = Signer.recoverAddress(
      hashMessage(message),
      signature,
    );

    expect(recoveredAddress).toEqual(account.address);
  });

  test('should be able to sign a transaction', async () => {
    using launched = await launchTestNode();
    const account = await KMSAccount.create('mock-id', {}, launched.provider);

    // Send 1 coin to the account to be able to create a transfer
    await (
      await launched.wallets[0].transfer(account.address, bn.parseUnits('1'))
    ).waitForResult();

    const transaction = await account.createTransfer(
      Address.fromRandom(),
      bn.parseUnits('0.1'),
    );
    const signature = await account.signTransaction(transaction);
    const chainId = await launched.provider.getChainId();
    const recoveredAddress = Signer.recoverAddress(
      transaction.getTransactionId(chainId),
      signature,
    );

    expect(recoveredAddress).toEqual(account.address);
  });
});
