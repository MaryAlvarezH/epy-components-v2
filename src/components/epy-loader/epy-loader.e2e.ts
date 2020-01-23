import { newE2EPage } from '@stencil/core/testing';

describe('epy-loader', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<epy-loader></epy-loader>');

    const element = await page.find('epy-loader');
    expect(element).toHaveClass('hydrated');
  });
});
