import {
  type TransactionResult,
  type TransactionType,
  TransactionResponse,
} from 'fuels';

import { type UseQueryParams, useNamedQuery } from '../core';
import { useFuel } from '../providers';
import { QUERY_KEYS } from '../utils';

type UseTransactionResultParams<
  TTransactionType extends TransactionType,
  TName,
  TData,
> = {
  txId?: string;
  name?: TName;
  query?: UseQueryParams<
    TransactionResult<TTransactionType> | null,
    Error,
    TData
  >;
};

export const useTransactionResult = <
  TTransactionType extends TransactionType,
  TName extends string = string,
  TData = TransactionResult<TTransactionType> | null,
>({
  txId = '',
  name = 'transactionResult' as TName,
  query,
}: UseTransactionResultParams<TTransactionType, TName, TData>) => {
  const { fuel } = useFuel();

  return useNamedQuery(name, {
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
