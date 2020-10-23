// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

// If use litElement base class
import { LitElement, html, css } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";
import styleCss from "./style-css.js";

class AuroBundle extends LitElement {
  static get properties() {
    return {
      cssClass:   { type: String }
    };
  }

  static get styles() {
    return css`
      .green {
        color: green;
      }
      ${styleCss}
    `;
  }
  render() {
    const classes = {
      green: true
    }
    return html`
      <div class=${this.cssClass}>
        <p class="${classMap(classes)}">More content</p>
        <slot></slot>
      </div>
    `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-bundle")) {
  customElements.define("auro-bundle", AuroBundle);
}
