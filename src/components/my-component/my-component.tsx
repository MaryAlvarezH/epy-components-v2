import { Component, Prop, h, Event, EventEmitter, Listen } from "@stencil/core";

@Component({
  tag: "my-component",
  styleUrl: "my-component.scss",
  shadow: false
})
export class MyComponent {
  @Prop() epyclass: string;

  @Event() clickButton: EventEmitter;

  // clickButtonHandler(e) {
  //   console.log("new Click");
  //   this.clickButton.emit(e);
  // }

  @Listen("click", { capture: true })
  handleClick(e) {
    if (!this.epyclass.includes("disabled")) {
      console.log("click", e);
    }
  }

  render() {
    return (
      <button
        class={this.epyclass}
        disabled={this.epyclass.includes("disabled")}
      >
        <slot></slot>
      </button>
    );
  }
}
