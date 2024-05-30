import { useMutation } from '@tanstack/react-query';
import type { TransactionRequestLike } from 'fuels';
import { useFuel } from '../providers';

type UseSendTransactionParams = {
  address: string;
  transaction: TransactionRequestLike;
};

export const useSendTransaction = () => {
  const { fuel } = useFuel();

  // @TODO: Add a named mutation return, to reduce re-renders
  const { mutate, mutateAsync, ...queryProps } = useMutation({
    mutationFn: (params: UseSendTransactionParams) => {
      return fuel.sendTransaction(params.address, params.transaction);
    },
  });

  return {
    addNetwork: (params: UseSendTransactionParams) => mutate(params),
    ...queryProps,
  };
};
