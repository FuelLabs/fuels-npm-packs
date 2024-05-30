import { type AbstractAddress, type JsonAbi, Contract } from 'fuels';
import type { FunctionNames, InputsForFunctionName } from 'src/types';

import { useNamedQuery } from '../core/useNamedQuery';
import { QUERY_KEYS } from '../utils';

import { abi as _abi } from './abi-ex';
import { useProvider } from './useProvider';

export const useContractRead = <
  TAbi extends JsonAbi,
  TFunctionName extends FunctionNames<TAbi>
>({address, abi, functionName, args}: {
  address: AbstractAddress; 
  abi: TAbi; 
  functionName: TFunctionName;
  args: InputsForFunctionName<TAbi, TFunctionName>;
}) => {
  const { provider } = useProvider();
  const chainId = provider?.getChainId();

  return useNamedQuery(`contract`, {
    queryKey: QUERY_KEYS.contract(address.toString(), chainId, args?.toString()),
    queryFn: async () => {
      if (!provider || !chainId) {
        throw new Error('Provider and chainId are required to read the contract');
      };
      const contract = new Contract(address, abi, provider);
      
      const wouldWriteToStorage = Object.values(contract.interface.functions).find((f) => f.name === functionName)?.attributes?.find((attr) => attr.name === 'storage')?.arguments?.includes('write');

      if (wouldWriteToStorage) {
        throw new Error('Methods that write to storage should not be called with useContractRead');
      }
      contract.id
      return contract.functions[functionName](args);
    },
    enabled: !!provider && !!chainId,
   }
   )
};
