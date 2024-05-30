import { TransactionResponse } from 'fuels';
import { useNamedQuery } from '../core';
import { useFuel } from '../providers';
import { QUERY_KEYS } from '../utils';

type UseTransactionResponseParams = {
  txId?: string;
  waitForResult?: boolean;
}

export const useTransactionResponse = ({ txId = '', waitForResult = false }: UseTransactionResponseParams) => {
  const { fuel } = useFuel();

  return useNamedQuery('transactionResponse', {
    queryKey: QUERY_KEYS.transaction(txId), // @TODO: Update it
    queryFn: async () => {
      const provider = await fuel.getProvider();     
      const txResult = new TransactionResponse(txId, provider);

      if(waitForResult) {
        const data = await txResult.waitForResult();
        return data;
      }
      
      const data = await txResult.fetch();
      return data;
    },
    initialData: null,
    enabled: !!txId,
  });
};
