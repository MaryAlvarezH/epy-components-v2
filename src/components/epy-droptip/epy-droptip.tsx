import { Component, h, State, Prop } from "@stencil/core";

@Component({
  tag: "epy-droptip",
  styleUrl: "epy-droptip.scss",
  shadow: false
})
export class Droptip {
  @State() private droptipActive: boolean;
  @Prop() contentBgColor: string;

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
            <slot name="trigger"></slot>
          </div>
        </div>
        <div
          class="droptip-content"
          style={{ "background-color": this.contentBgColor }}
        >
          <slot></slot>
        </div>
      </div>
    );
  }
}
