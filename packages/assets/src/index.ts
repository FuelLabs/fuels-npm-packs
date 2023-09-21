import { assets as assetList } from './assets';
import { resolveIconPath } from './utils/populateIconPath';
export * from './utils/populateIconPath';
export * from './types';

export const assets = assetList;

export default resolveIconPath(process.env.BASE_URL || './', assetList);
