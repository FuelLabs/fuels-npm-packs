import { Option, program } from 'commander';

import { getBalance } from './actions/getBalance';
// import { getImplementation } from './actions/getImplementation';
import { getOwnership } from './actions/getOwnership';
import { setImplementation } from './actions/setImplementation';
import { transferOwnership } from './actions/transferOwnership';
import { transferSelf } from './actions/transferSelf';
import { createAccount } from './utils';

const optionProvider = new Option('--providerUrl <provider>', 'Provider URL is required!').env('PROVIDER_URL').makeOptionMandatory();
const optionAccountKey = new Option('-a, --account <account>', 'Account address is required!').env('ACCOUNT_KEY').makeOptionMandatory();

program
    .name('Proxy scripts')
    .description('Scripts for interacting with the proxy contract');

program
    .command('balance')
    .addOption(optionProvider)
    .addOption(optionAccountKey)
    .action(async (options) => {
        const account = await createAccount(options.account, options.providerUrl);
        await getBalance({ account });
    });

program
    .command('setImplementation')
    .addOption(optionProvider)
    .addOption(optionAccountKey)
    .requiredOption('-p, --proxyAddress <proxyAddress>', 'Proxy address is required!')
    .requiredOption('--implementationAddress <targetAddress>', 'Implementation address is required!')
    .action(async (options) => {
        const account = await createAccount(options.account, options.providerUrl);
        await setImplementation({
            account,
            proxyAddress: options.proxyAddress,
            implementationAddress: options.implementationAddress
        });
    });

// program
//     .command('getImplementation')
//     .addOption(optionProvider)
//     .addOption(optionAccountKey)
//     .requiredOption('-p, --proxyAddress <proxyAddress>', 'Proxy address is required!')
//     .action(async (options) => {
//         const account = await createAccount(options.account, options.providerUrl);
//         await getImplementation({
//             account,
//             proxyAddress: options.proxyAddress,
//         });
//     });

program
    .command('getOwnership')
    .addOption(optionProvider)
    .addOption(optionAccountKey)
    .requiredOption('-p, --proxyAddress <proxyAddress>', 'Proxy address is required!')
    .action(async (options) => {
        const account = await createAccount(options.account, options.providerUrl);
        await getOwnership({
            account,
            proxyAddress: options.proxyAddress,
        });
    });

program
    .command('transferOwnership')
    .addOption(optionProvider)
    .addOption(optionAccountKey)
    .requiredOption('-p, --proxyAddress <proxyAddress>', 'Proxy address is required!')
    .requiredOption('--newOwner <newOwner>', 'New owner address is required!')
    .action(async (options) => {
        const account = await createAccount(options.account, options.providerUrl);
        await transferOwnership({
            account,
            proxyAddress: options.proxyAddress,
            newOwner: options.newOwner
        });
    });

program
    .command('transferSelf')
    .addOption(optionProvider)
    .addOption(optionAccountKey)
    .action(async (options) => {
        const account = await createAccount(options.account, options.providerUrl);
        await transferSelf({ account });
    });

program
    .parse()
    .showSuggestionAfterError();
