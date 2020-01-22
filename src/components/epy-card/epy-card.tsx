import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'epy-card',
  styleUrl: 'epy-card.scss',
  shadow: false
})
export class EpyCard {

  @Prop() epyclass: string;

  render() {
    console.log('render card')
    return (
      <div class={this.epyclass}>
      <slot></slot>
    </div>
    );
  }

}
