import { Proxy } from '@fuel-bridge/fungible-token';
import { type Account } from 'fuels';

type GetImplementationParams = {
  account: Account;
  proxyAddress: string;
};

export async function getImplementation({
  account,
  proxyAddress,
}: GetImplementationParams) {
  const proxy = new Proxy(proxyAddress, account);

  console.log(`Proxy(${proxyAddress}) get implementation script initiated`);
  console.log('\t> Account address: ', account.address.toB256());
  console.log(
    '\t> Balance: ',
    (await account.getBalance()).format({
      precision: 9,
    }),
  );

  const { value: currentTarget } = await proxy.functions.proxy_target().get();

  console.log(`\t> Implementation: ${currentTarget.bits}`);
}
