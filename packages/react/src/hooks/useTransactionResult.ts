import {
  TransactionResponse,
  type TransactionResult,
  TransactionType,
} from 'fuels';

import { type UseQueryParams, useNamedQuery } from '../core';
import { useFuel } from '../providers';
import { QUERY_KEYS } from '../utils';

type UseTransactionResultParams<
  TTransactionType extends TransactionType,
  TData,
> = {
  txId?: string;
  query?: UseQueryParams<
    TransactionResult<TTransactionType> | null,
    Error,
    TData
  >;
};

export const useTransactionResult = <
  TTransactionType extends TransactionType,
  TData = TransactionResult<TTransactionType> | null,
>({
  txId = '',
  query,
}: UseTransactionResultParams<TTransactionType, TData>) => {
  const { fuel } = useFuel();

  return useNamedQuery('transactionResult', {
    queryKey: QUERY_KEYS.transactionResult(txId),
    queryFn: async () => {
      const provider = await fuel.getProvider();
      if (!provider) return null;

      const txResult = new TransactionResponse(txId, provider);
      const data = await txResult.waitForResult<TTransactionType>();

      return data || null;
    },
    initialData: null,
    enabled: !!txId,
    ...query,
  });
};
