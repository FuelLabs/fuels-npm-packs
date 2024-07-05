import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { QUERY_KEYS } from '../utils';

import { useFuel } from './FuelHooksProvider';

export function FuelEventsWatcher() {
  const { fuel } = useFuel();
  const queryClient = useQueryClient();

  function onCurrentConnectorChange() {
    console.log('asd onCurrentConnectorChange');
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.account() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.isConnected() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wallet() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.balance() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.provider() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.nodeInfo() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.accounts() });
  }

  function onConnectorsChange() {
    console.log(`asd onConnectorsChange`);
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.connectorList() });
  }

  function onCurrentAccountChange() {
    console.log(`asd onCurrentAccountChange`);
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.account() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wallet() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.balance() });
  }

  function onConnectionChange() {
    console.log(`asd onConnectionChange`);
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.isConnected() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.account() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wallet() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.balance() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.provider() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.nodeInfo() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.accounts() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.connectorList() });
  }

  function onNetworkChange() {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentNetwork() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.provider() });
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.transactionReceipts(),
    });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.chain() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.nodeInfo() });
  }

  function onAccountsChange() {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.account() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.accounts() });
  }

  function onAssetsChange() {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.assets() });
  }

  useEffect(() => {
    console.log(`asd start listeners`);
    fuel.on(fuel.events.currentAccount, onCurrentAccountChange);
    fuel.on(fuel.events.currentConnector, onCurrentConnectorChange);
    fuel.on(fuel.events.connectors, onConnectorsChange);
    fuel.on(fuel.events.connection, onConnectionChange);
    fuel.on(fuel.events.accounts, onAccountsChange);
    fuel.on(fuel.events.currentNetwork, onNetworkChange);
    fuel.on(fuel.events.assets, onAssetsChange);

    return () => {
      console.log(`asd remove listeners`);
      fuel.off(fuel.events.currentConnector, onCurrentConnectorChange);
      fuel.off(fuel.events.currentAccount, onCurrentAccountChange);
      fuel.off(fuel.events.connectors, onConnectorsChange);
      fuel.off(fuel.events.connection, onConnectionChange);
      fuel.off(fuel.events.accounts, onAccountsChange);
      fuel.off(fuel.events.currentNetwork, onNetworkChange);
      fuel.off(fuel.events.assets, onAssetsChange);
    };
  }, [fuel, queryClient]);

  return null;
}
