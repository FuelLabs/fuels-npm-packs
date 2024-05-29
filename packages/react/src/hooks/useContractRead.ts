import type { Abi } from 'abitype';
import { type AbstractAddress, type JsonAbi, Contract } from 'fuels';
import type { ContractFunctionName, ContractFunctionArgs } from 'viem';

import { useNamedQuery } from '../core/useNamedQuery';
import { QUERY_KEYS } from '../utils';

import { useProvider } from './useProvider';

type ReadOnlyCalls = 'pure' | 'view';

export const useContractRead = <
  abi extends (Abi & JsonAbi),
  functionName extends ContractFunctionName<abi, ReadOnlyCalls>,
  args extends ContractFunctionArgs<abi, ReadOnlyCalls, functionName>
>({address, abi, functionName, args}: {
  address: AbstractAddress; 
  abi: abi; 
  functionName: functionName;
  args: args;
}) => {
  const { provider } = useProvider();
  const chainId = provider?.getChainId();

   useNamedQuery(`contract`, {
    queryKey: QUERY_KEYS.contract(address?.toString(), chainId, args?.toString()),
    queryFn: async () => {
      if (!provider || !chainId) {
        throw new Error('Provider and chainId are required to read the contract');
      };
      const contract = new Contract(address, abi, provider);
      return contract.functions[functionName](args);
    },
    enabled: !!provider && !!chainId,
   }

   )
};
