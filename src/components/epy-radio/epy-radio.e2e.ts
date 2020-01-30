import { newE2EPage } from '@stencil/core/testing';

describe('epy-radio', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<epy-radio></epy-radio>');

    const element = await page.find('epy-radio');
    expect(element).toHaveClass('hydrated');
  });
});
