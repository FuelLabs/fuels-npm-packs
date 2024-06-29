import type { FuelConnector } from 'fuels';

import { ConnectorIcon } from '../ConnectorIcon';

import {
  ConnectorButton,
  ConnectorContent,
  ConnectorDescription,
  ConnectorImage,
  ConnectorTitle,
} from './styles';
import { useEffect, useState } from 'react';
import { useConnectUI } from '../../../../providers/FuelUIProvider';

type ConnectorProps = {
  theme?: string;
  className?: string;
  connector: FuelConnector;
};

export function Connector({ className, connector, theme }: ConnectorProps) {
  const {
    install: { action, link, description },
  } = connector.metadata;

  const {
    dialog: { connect },
  } = useConnectUI();
  const [isLoading, setLoading] = useState(!connector.installed);

  useEffect(() => {
    const ping = async () => {
      // If the connector have been detected from the SDK, we don't need to ping it again
      if (connector.installed) return;

      // Let's give a last chance to the connector to detect it
      try {
        await connector.ping();
        connector.installed = true;
        connect(connector);
      } catch (_error) {
        setLoading(false);
      }
    };

    ping();
  }, [connector, connect]);

  return (
    <div className={className}>
      <ConnectorImage>
        <ConnectorIcon
          connectorMetadata={connector.metadata}
          connectorName={connector.name}
          size={100}
          theme={theme}
        />
      </ConnectorImage>
      <ConnectorContent>
        <ConnectorTitle>{connector.name}</ConnectorTitle>
        <ConnectorDescription>
          {isLoading ? 'Loading...' : description}
        </ConnectorDescription>
      </ConnectorContent>
      {!isLoading && (
        <ConnectorButton href={link} target="_blank">
          {action || 'Install'}
        </ConnectorButton>
      )}
    </div>
  );
}
