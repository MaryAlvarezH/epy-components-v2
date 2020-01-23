import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "epy-button",
  styleUrl: "epy-button.scss",
  shadow: false
})
export class EpyComponent {
  @Prop() type: string;
  @Event() clickButton: EventEmitter;

  // Click with Event decorator
  clickButtonHandler(e) {
    if (!this.type.includes("disabled")) {
      this.clickButton.emit(e);
    }
  }

  render() {
    return (
      <button
        class={"btn " + this.type}
        disabled={this.type.includes("disabled")}
        onClick={(event: UIEvent) => this.clickButtonHandler(event)}
      >
        <slot></slot>
      </button>
    );
  }
}
