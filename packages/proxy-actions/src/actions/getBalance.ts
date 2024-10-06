import type { Account } from 'fuels';

type GetBalanceParams = {
  account: Account;
};

export async function getBalance({ account }: GetBalanceParams) {
  const balance = await account.getBalance();
  console.log(
    `${account.address.toB256()}: ${balance.format({
      precision: 9,
    })}`,
  );
}
