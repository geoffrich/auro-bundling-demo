import { fixture, html, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/auro-bundle.js';

describe('auro-bundle', () => {
  it('sets the CSS class on auro-bundle > div element', async () => {
    const el = await fixture(html`
      <auro-bundle cssclass="testClass"></auro-bundle>
    `);

    const div = el.shadowRoot.querySelector('div');
    expect(div.className).to.equal('testClass');
  });

  it('auro-bundle is accessible', async () => {
    const el = await fixture(html`
      <auro-bundle cssclass="testClass"></auro-bundle>
    `);

    await expect(el).to.be.accessible();
  });

  it('auro-bundle custom element is defined', async () => {
    const el = await !!customElements.get("auro-bundle");

    await expect(el).to.be.true;
  });
});
