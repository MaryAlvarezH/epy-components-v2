import { newE2EPage } from '@stencil/core/testing';

describe('epy-droptip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<epy-droptip></epy-droptip>');

    const element = await page.find('epy-droptip');
    expect(element).toHaveClass('hydrated');
  });
});
