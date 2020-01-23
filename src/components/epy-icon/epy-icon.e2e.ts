import { newE2EPage } from '@stencil/core/testing';

describe('epy-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<epy-icon></epy-icon>');

    const element = await page.find('epy-icon');
    expect(element).toHaveClass('hydrated');
  });
});
