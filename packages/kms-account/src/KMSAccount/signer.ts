import type { KMSClientConfig } from '@aws-sdk/client-kms';
import {
  KMSClient,
  GetPublicKeyCommand,
  SignCommand,
} from '@aws-sdk/client-kms';
import { secp256k1 } from '@noble/curves/secp256k1';
import * as asn1js from 'asn1js';
import type { BytesLike } from 'fuels';
import { arrayify, concat, hash, hexlify, Signer, toBytes } from 'fuels';

type Signature = {
  s: bigint;
  r: bigint;
  recoveryParam?: number;
};

export class KMSSigner {
  private kmsClient: KMSClient;
  private kmsKeyId: string;

  // Public
  address: string;
  publicKey: string;

  constructor(kmsClient: KMSClient, kmsKeyId: string, publicKey: string) {
    this.kmsClient = kmsClient;
    this.kmsKeyId = kmsKeyId;
    this.publicKey = publicKey;
    this.address = hash(publicKey);
  }

  static async create(kmsKeyId: string, kmsClientConfig: KMSClientConfig) {
    const kmsClient = new KMSClient(kmsClientConfig);
    const command = new GetPublicKeyCommand({ KeyId: kmsKeyId });
    const response = await kmsClient.send(command);
    if (!response.PublicKey) {
      throw new Error(
        'Error when getting public key from KMS response undefined',
      );
    }
    const publicKey = KMSSigner.publicKeyFromAsn1(response.PublicKey);

    return new KMSSigner(kmsClient, kmsKeyId, publicKey);
  }

  static publicKeyFromAsn1(buf: Uint8Array): string {
    const { result } = asn1js.fromBER(buf);
    const values = (result as asn1js.Sequence).valueBlock.value;
    const value = values[1] as asn1js.BitString;
    const valueBuffer = Buffer.from(value.valueBlock.valueHex);
    return hexlify(valueBuffer.slice(1));
  }

  static recoverPublicKeyFromSignature(
    msgHash: Uint8Array,
    signature: Signature,
  ): string {
    const sig = new secp256k1.Signature(
      signature.r,
      signature.s,
    ).addRecoveryBit(signature.recoveryParam || 0);
    const publicKey = sig
      .recoverPublicKey(arrayify(msgHash))
      .toRawBytes(false)
      .slice(1);
    return hexlify(publicKey);
  }

  static recoverPublicKey(signature: Uint8Array, msgHash: Uint8Array): string {
    return Signer.recoverPublicKey(msgHash, signature);
  }

  findRecovery(digest: Uint8Array, signature: Signature): number {
    const address = KMSSigner.recoverPublicKeyFromSignature(digest, signature);
    const address1 = KMSSigner.recoverPublicKeyFromSignature(digest, {
      ...signature,
      recoveryParam: 1,
    });
    if (address === this.publicKey) {
      return 0;
    }
    if (address1 === this.publicKey) {
      return 1;
    }
    throw new Error('Failed find recovery param');
  }

  encodeSignature(signature: Signature, digest: Uint8Array): string {
    const maxPointS = BigInt(
      '0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141',
    );
    const halfPointS = maxPointS / 2n;
    // According to EIP2 https://github.com/ethereum/EIPs/blob/master/EIPS/eip-2.md
    // if s < half the curve we need to invert it
    // s = curve.n - s
    let normalizedS = signature.s;
    if (normalizedS > halfPointS) {
      normalizedS = maxPointS - normalizedS;
    }
    const normalizedSignature = { ...signature, s: normalizedS };
    const recovery = this.findRecovery(digest, normalizedSignature);
    const r = toBytes(`0x${normalizedSignature.r.toString(16)}`, 32);
    const s = toBytes(`0x${normalizedSignature.s.toString(16)}`, 32);

    // add recoveryParam to first s byte
    s[0] |= (recovery << 7) | (s[0] & 0x7f);

    return hexlify(concat([r, s]));
  }

  async sign(digest: BytesLike): Promise<string> {
    const Message = arrayify(digest);
    const commandSign = new SignCommand({
      KeyId: this.kmsKeyId,
      Message,
      SigningAlgorithm: 'ECDSA_SHA_256',
      MessageType: 'DIGEST',
    });
    const responseSign = await this.kmsClient.send(commandSign);

    if (!responseSign.Signature) {
      throw new Error(
        'Error when getting signature from KMS response undefined',
      );
    }
    const signature = secp256k1.Signature.fromDER(responseSign.Signature);

    return this.encodeSignature(signature, Message);
  }
}
