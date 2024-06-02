import { Contract, type Account, type Address, type JsonAbi, type Provider } from 'fuels';
import type { FunctionNames, InputsForFunctionName } from 'src/types';

import { useNamedQuery } from '../core/useNamedQuery';
import { QUERY_KEYS } from '../utils';

type ContractReadProps<TAbi extends JsonAbi, TFunctionName extends FunctionNames<TAbi>> = {
  address: Address; 
  abi: TAbi; 
  provider: Account | Provider;
  functionName: TFunctionName;
  args: InputsForFunctionName<TAbi, TFunctionName>;
  contract?: never;
} | {
  abi?: never;
  address?: never;
  provider?: never;
  contract: Contract;
  functionName: TFunctionName;
  args: InputsForFunctionName<TAbi, TFunctionName>;
};

export const useContractRead = <
  TAbi extends JsonAbi,
  TFunctionName extends FunctionNames<TAbi>
>({address, abi, functionName, args, contract: _contract, provider}: ContractReadProps<TAbi, TFunctionName>) => {

  const isValid = !!_contract || (!!address && !!abi && !!provider);

  return useNamedQuery('contract', {
    queryKey: QUERY_KEYS.contract((_contract?.id || address || '')?.toString(), args?.toString()),
    queryFn: async () => {
      if (isValid) {
        throw new Error('Contract or address, abi and provider are required to read the contract');
      };
      const contract = _contract || new Contract(address, abi, provider);
      
      const wouldWriteToStorage = !contract.functions[functionName].isReadOnly;

      if (wouldWriteToStorage) {
        throw new Error('Methods that write to storage should not be called with useContractRead');
      }

      if (!contract?.functions?.[functionName]) {
        throw new Error(`Function ${functionName || ''} not found on contract`);
      }
      
      return args !== undefined ? contract.functions[functionName](args) : contract.functions[functionName]();
    },
    enabled: isValid,
   }
   )
};
