import { newE2EPage } from '@stencil/core/testing';

describe('epy-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<epy-input></epy-input>');

    const element = await page.find('epy-input');
    expect(element).toHaveClass('hydrated');
  });
});
