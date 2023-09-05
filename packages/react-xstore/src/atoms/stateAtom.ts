import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import type { InterpreterFrom, StateFrom } from 'xstate';

import type { MachinesObj } from '../types';

import type { ServiceAtom } from './serviceAtom';

/**
 * Create an atom family to get the state of a machine.
 * @param key The key of the machine.
 * @returns The state of the machine.
 * @example
 * const [state, send] = useAtom(stateAtom('counter'));
 */
export function createStateAtom<T extends MachinesObj>(
  serviceAtom: ServiceAtom<T>,
) {
  return atomFamily((key: keyof T) => {
    type Machine = T[keyof T];
    type Service = InterpreterFrom<Machine>;
    type Event = Parameters<Service['send']>[0];
    return atom(
      (get) => {
        const service = get(serviceAtom(key));
        return service.getSnapshot() as StateFrom<Machine>;
      },
      (get, _set, ev: Event) => {
        const service = get(serviceAtom(key));
        service.send(ev);
      },
    );
  });
}
export type StateAtom<T extends MachinesObj> = ReturnType<
  typeof createStateAtom<T>
>;
