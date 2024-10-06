import { Proxy } from "@fuel-bridge/fungible-token";
import { Address, type Account } from "fuels";

type SetImplementationParams = {
    account: Account;
    proxyAddress: string;
    implementationAddress: string;
};

export async function setImplementation({ account, proxyAddress, implementationAddress }: SetImplementationParams) {
    const proxy = new Proxy(proxyAddress, account);

    console.log(`Proxy(${proxyAddress}) set implementation script initiated`);
    console.log('\t> Owner address: ', account.address.toB256());
    console.log('\t> Balance: ', (await account.getBalance()).format({
      precision: 9
    }));

    const { id: contract_id } = await account.provider.getContract(implementationAddress);
    if (!contract_id) {
        console.log(`\t> Implementation ${implementationAddress} not found`);
        return;
    }

    const { value: currentTarget } = await proxy.functions.proxy_target().get();
    if (currentTarget.bits === implementationAddress) {
        console.log(`\t> Implementation ${implementationAddress} is already live in the proxy`);
        return;
    }

    console.log('\t> New implementation at ', implementationAddress);
    const contractId = Address.fromB256(implementationAddress);
    const contractIdentityInput = { bits: contractId.toB256() };
    const tx = await proxy.functions
      .set_proxy_target(contractIdentityInput)
      .call();

    console.log('\t> Transaction ID: ', tx.transactionId);
    await tx.waitForResult();
}