/// <reference types="@types/react-dom/test-utils" />
import { act } from '@ariakit/test';
import { renderHook } from '@testing-library/react';

export const hooks = {
  render: renderHook,
  act,
};
