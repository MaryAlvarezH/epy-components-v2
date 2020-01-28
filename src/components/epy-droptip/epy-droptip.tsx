import { Component, h, State } from "@stencil/core";

@Component({
  tag: "epy-droptip",
  styleUrl: "epy-droptip.scss",
  shadow: false
})
export class Droptip {
  @State() private droptipActive: boolean;

  render() {
    return (
      <div
        class={{
          "droptip ": !this.droptipActive,
          "droptip active": this.droptipActive
        }}
        tabindex="0"
        onClick={() => (this.droptipActive = !this.droptipActive)}
        onBlur={() => (this.droptipActive = false)}
      >
        <div class="droptip-trigger">
          <div class="droptip-title">
            <slot name="title"></slot>
          </div>
        </div>
        <div class="droptip-content">
          <slot name="content"></slot>
        </div>
      </div>
    );
  }
}
