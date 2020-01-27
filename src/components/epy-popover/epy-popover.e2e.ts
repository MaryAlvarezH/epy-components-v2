import { newE2EPage } from '@stencil/core/testing';

describe('epy-popover', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<epy-popover></epy-popover>');

    const element = await page.find('epy-popover');
    expect(element).toHaveClass('hydrated');
  });
});
