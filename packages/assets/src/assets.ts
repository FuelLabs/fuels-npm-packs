import type { Assets } from './types';

export const assets: Assets = [{
    name: 'Ethereum',
    description: 'Fuel base asset',
    symbol: 'ETH',
    icon: 'eth.svg',
    assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
    networks: [{
        type: 'ethereum',
        chainId: 0,
        decimals: 18,
    }, {
        type: 'fuel',
        chainId: 0,
        decimals: 9,
        assetId: '0x0000000000000000000000000000000000000000000000000000000000000000'
    }]
}];
