import { newE2EPage } from '@stencil/core/testing';

describe('epy-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<epy-card></epy-card>');

    const element = await page.find('epy-card');
    expect(element).toHaveClass('hydrated');
  });
});
