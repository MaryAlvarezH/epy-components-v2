import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "epy-button",
  styleUrl: "epy-button.scss",
  shadow: false
})
export class EpyComponent {
  @Prop() type: string;
  @Prop() disabled: boolean;
  @Event() onClick: EventEmitter;

  // Click with Event decorator
  handleClick(ev) {
    if ((this.type && !this.type.includes("disabled")) || !this.type) {
      this.onClick.emit(ev);
    }
  }

  render() {
    return (
      <button
        class={"btn " + this.type}
        disabled={
          (this.type && this.type.includes("disabled")) || this.disabled
        }
        onClick={(ev: UIEvent) => this.handleClick(ev)}
      >
        <slot></slot>
      </button>
    );
  }
}
