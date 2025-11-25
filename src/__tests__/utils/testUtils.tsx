import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

// Custom render function for testing
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options });

export * from '@testing-library/react';
export { customRender as render };

// Dummy test to prevent Jest error
describe('Test Utils', () => {
  it('should export render function', () => {
    expect(customRender).toBeDefined();
  });
});