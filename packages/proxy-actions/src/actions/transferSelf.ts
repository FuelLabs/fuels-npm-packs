import { bn, type Account } from "fuels";

type GetBalanceParams = {
    account: Account;
}

export async function transferSelf({ account }: GetBalanceParams) {
    console.log(`\t> Account initiate a transfer of 0.0000001 to itself`);
    const transfer = await account.transfer(account.address, bn.parseUnits('0.0000001'));
    await transfer.waitForResult();
    console.log(`\t> Transfer transaction ID: ${transfer.id}`);
}
