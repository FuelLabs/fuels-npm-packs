import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useRef, useState } from 'react';

import { useConnectUI } from '../../providers/FuelUIProvider';

import { Connector } from './components/Connector/Connector';
import { Connectors } from './components/Connectors';
import {
  DialogContent,
  BackIcon,
  CloseIcon,
  DialogOverlay,
  DialogTitle,
  DialogMain,
  FuelRoot,
} from './styles';
import { getThemeVariables } from './themes';

export function Connect() {
  // Fix hydration problem between nextjs render and frontend render
  // UI was not getting updated and theme colors was set wrongly
  // see more here https://nextjs.org/docs/messages/react-hydration-error
  const [isClient, setIsClient] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    theme,
    cancel,
    dialog: { isOpen, connector, back },
  } = useConnectUI();

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleOpenChange = (openState: boolean) => {
    if (!openState) cancel();
  };

  return (
    <>
      <FuelRoot
        ref={containerRef}
        style={isClient ? {
          display: isOpen ? 'block' : 'none',
          ...getThemeVariables(theme),
        } : undefined}
      />
      <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
        <Dialog.Portal container={containerRef.current}>
          <DialogOverlay />
          <DialogContent data-connector={!!connector}>
            <DialogTitle>Connect Wallet</DialogTitle>
            <Dialog.Close asChild>
              <CloseIcon size={24} />
            </Dialog.Close>
            <BackIcon size={24} onClick={back} data-connector={!!connector} />
            <DialogMain>
              {connector ? <Connector connector={connector} /> : <Connectors />}
            </DialogMain>
          </DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
