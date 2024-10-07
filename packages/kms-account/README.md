## KMS Account

A Fuel Account that uses AWS KMS to sign transactions and messages.

### Installation

```bash
pnpm install @fuels/kms-account
```

### Usage

```ts
import { KMSAccount } from '@fuels/kms-account';
import { Provider } from 'fuels';

const provider = new Provider('http://127.0.0.1:4000/graphql');
const account = await KMSAccount.create('kms-key-id', {}, provider);
```

### Signing messages

```ts
const message = 'Hello, world!';
const signature = await account.signMessage(message);
```

### Signing transactions

```ts
const transaction = await account.createTransfer(
  Address.fromRandom(),
  bn.parseUnits('0.1'),
);
const signature = await account.signTransaction(transaction);
```

### License

This package is licensed under the Apache 2.0 license.
