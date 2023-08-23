import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import failOnConsole from 'jest-fail-on-console';

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
global.ResizeObserver = require('resize-observer-polyfill');

if (typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    enumerable: true,
    configurable: true,
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

const ERRORS_MSGS = [
  /warning: ReactDOM.render is no longer supported in React/i,
  /when testing, code that causes React state updates should be wrapped into act/i,
];

failOnConsole({
  shouldFailOnWarn: false,
  silenceMessage: (errorMessage) => {
    return ERRORS_MSGS.some((errorMsg) => errorMsg.test(errorMessage));
  },
});

if (process.env.DEBUG) {
  beforeEach(() => {
    configure({
      throwSuggestions: true,
    });
  });
}
