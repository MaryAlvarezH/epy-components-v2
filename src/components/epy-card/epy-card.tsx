import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "epy-card",
  styleUrl: "epy-card.scss",
  shadow: false
})
export class EpyCard {
  @Prop() type: string;

  render() {
    return (
      <div class={"card " + this.type}>
        <slot></slot>
      </div>
    );
  }
}
