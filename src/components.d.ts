/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface EpyButton {
    'epyclass': string;
  }
  interface EpyCard {
    'epyclass': string;
  }
  interface EpyIcon {
    'icon': string;
  }
}

declare global {


  interface HTMLEpyButtonElement extends Components.EpyButton, HTMLStencilElement {}
  var HTMLEpyButtonElement: {
    prototype: HTMLEpyButtonElement;
    new (): HTMLEpyButtonElement;
  };

  interface HTMLEpyCardElement extends Components.EpyCard, HTMLStencilElement {}
  var HTMLEpyCardElement: {
    prototype: HTMLEpyCardElement;
    new (): HTMLEpyCardElement;
  };

  interface HTMLEpyIconElement extends Components.EpyIcon, HTMLStencilElement {}
  var HTMLEpyIconElement: {
    prototype: HTMLEpyIconElement;
    new (): HTMLEpyIconElement;
  };
  interface HTMLElementTagNameMap {
    'epy-button': HTMLEpyButtonElement;
    'epy-card': HTMLEpyCardElement;
    'epy-icon': HTMLEpyIconElement;
  }
}

declare namespace LocalJSX {
  interface EpyButton {
    'epyclass'?: string;
    'onClickButton'?: (event: CustomEvent<any>) => void;
  }
  interface EpyCard {
    'epyclass'?: string;
  }
  interface EpyIcon {
    'icon'?: string;
  }

  interface IntrinsicElements {
    'epy-button': EpyButton;
    'epy-card': EpyCard;
    'epy-icon': EpyIcon;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'epy-button': LocalJSX.EpyButton & JSXBase.HTMLAttributes<HTMLEpyButtonElement>;
      'epy-card': LocalJSX.EpyCard & JSXBase.HTMLAttributes<HTMLEpyCardElement>;
      'epy-icon': LocalJSX.EpyIcon & JSXBase.HTMLAttributes<HTMLEpyIconElement>;
    }
  }
}


