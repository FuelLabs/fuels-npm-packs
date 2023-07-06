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
    addTodo: 'ADD_TODO';
    clearCompleted: 'CLEAR_COMPLETED';
    completeTodo: 'COMPLETE_TODO';
    removeTodo: 'REMOVE_TODO';
    reset: 'RESET';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates: 'idle';
  tags: never;
}
