import '@testing-library/jest-dom';
import type { RenderOptions } from '@testing-library/react';
import type { JestAxeConfigureOptions } from 'jest-axe';
import { axe, toHaveNoViolations } from 'jest-axe';
import * as React from 'react';

import { render } from './render';

expect.extend(toHaveNoViolations);

export async function testA11y(
  ui: React.ReactElement | HTMLElement,
  options: RenderOptions & { axeOptions?: JestAxeConfigureOptions } = {},
) {
  const { axeOptions, ...rest } = options;
  const container = React.isValidElement(ui) ? render(ui, rest).container : ui;
  const results = await axe(container as HTMLElement, axeOptions);
  expect(results).toHaveNoViolations();
}
