import { press } from '@ariakit/test';
import '@testing-library/jest-dom';
import type { RenderOptions } from '@testing-library/react';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toHaveNoViolations } from 'jest-axe';
import type * as React from 'react';

expect.extend(toHaveNoViolations);

export function render(
  ui: React.ReactElement,
  options: RenderOptions = {},
): ReturnType<typeof rtlRender> & { user: ReturnType<typeof userEvent.setup> } {
  const user = { ...userEvent.setup(), press };
  const result = rtlRender(ui, options);
  return { user, ...result };
}
