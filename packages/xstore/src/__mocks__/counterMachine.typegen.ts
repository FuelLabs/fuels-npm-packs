// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    decrement: 'DECREMENT';
    increment: 'INCREMENT';
    log: 'DECREMENT' | 'INCREMENT';
    reset: 'RESET';
    setType: 'SET_TYPE';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates: 'automatic' | 'idle';
  tags: never;
}
