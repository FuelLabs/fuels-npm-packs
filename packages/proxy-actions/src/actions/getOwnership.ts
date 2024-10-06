/**
 * This is a stand-alone script that upgrades the bridge
 */
import { Proxy } from '@fuel-bridge/fungible-token';
import type { Account} from 'fuels';

import { debug } from '../utils';

type GetOwnershipParams = {
    account: Account;
    proxyAddress: string;
}

export const getOwnership = async ({ account, proxyAddress }: GetOwnershipParams) => {
  const proxy = new Proxy(proxyAddress, account);

  console.log(`Proxy(${proxyAddress}) get ownership script initiated`);
  console.log('\t> Balance: ', (await account.getBalance()).format({
    precision: 9
  }));

  debug('Detecting if the bridge is a proxy...');
  const owner: string | null = await proxy.functions
    ._proxy_owner()
    .get()
    .then((result) => {
      debug('Proxy._proxy.owner() succeeded, assuming proxy');
      return result.value.Initialized.Address.bits;
    })
    .catch((e) => {
      console.error(e);
      debug(`Proxy._proxy_owner() failed with error: `);
      debug(`${JSON.stringify(e, undefined, 2)}`);
      return null;
    });

  console.log('\t> Owner: ', owner);
};

