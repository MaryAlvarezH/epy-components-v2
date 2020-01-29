import { newE2EPage } from '@stencil/core/testing';

describe('epy-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<epy-checkbox></epy-checkbox>');

    const element = await page.find('epy-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});
