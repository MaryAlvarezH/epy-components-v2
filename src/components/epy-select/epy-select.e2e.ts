import { newE2EPage } from '@stencil/core/testing';

describe('epy-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<epy-select></epy-select>');

    const element = await page.find('epy-select');
    expect(element).toHaveClass('hydrated');
  });
});
