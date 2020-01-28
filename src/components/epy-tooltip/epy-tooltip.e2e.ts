import { newE2EPage } from '@stencil/core/testing';

describe('epy-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<epy-tooltip></epy-tooltip>');

    const element = await page.find('epy-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});
