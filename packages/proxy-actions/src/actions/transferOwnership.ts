/**
 * This is a stand-alone script that upgrades the bridge
 */
import { Proxy } from '@fuel-bridge/fungible-token';
import type { Account } from 'fuels';
import { Address } from 'fuels';

import { debug } from '../utils';

type TransferOwnershipParams = {
  account: Account;
  newOwner: string;
  proxyAddress: string;
};

export const transferOwnership = async ({
  account,
  newOwner,
  proxyAddress,
}: TransferOwnershipParams) => {
  const proxy = new Proxy(proxyAddress, account);

  console.log(`Proxy(${proxyAddress}) transfer ownership script initiated`);
  console.log('\t> Owner address: ', account.address.toB256());
  console.log(
    '\t> Balance: ',
    (await account.getBalance()).format({
      precision: 9,
    }),
  );

  debug('Detecting if contract is a proxy...');
  const owner: string | null = await proxy.functions
    ._proxy_owner()
    .get()
    .then((result) => {
      debug('Proxy._proxy.owner() succeeded, assuming proxy');
      return result.value.Initialized.Address.bits;
    })
    .catch((e) => {
      debug(`Proxy._proxy_owner() failed with error: `);
      debug(`${JSON.stringify(e, undefined, 2)}`);
      return null;
    });

  if (owner === null) {
    console.log('Could not fetch the proxy owner, is it a proxy?');
    return;
  }

  if (
    owner.replace('0x', '').toLowerCase() !==
    account.address.toB256().replace('0x', '').toLowerCase()
  ) {
    console.log(`\t> Owner mismatch, contract owned by ${owner}`);
    return;
  }

  // New owner should be a valid b256 address
  const address = Address.fromB256(newOwner);
  const addressInput = { bits: address.toB256() };
  const addressIdentityInput = { Address: addressInput };
  const tx = await proxy.functions
    ._proxy_change_owner(addressIdentityInput)
    .call();

  console.log('\t> Transaction ID: ', tx.transactionId);
  await tx.waitForResult();
};
