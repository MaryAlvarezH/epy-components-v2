import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "epy-button",
  styleUrl: "epy-button.scss",
  shadow: false
})
export class EpyComponent {
  @Prop() epyclass: string;
  @Event() clickButton: EventEmitter;

  // Click with Event decorator
  clickButtonHandler(e) {
    if (!this.epyclass.includes("disabled")) {
      console.log("handler click");
      this.clickButton.emit(e);
    }
  }

  // CLick with Listen decorator
  // @Listen("click", { capture: true })
  // handleClick() {
  //   if (!this.epyclass.includes("disabled")) {
  //     console.log("listen click ");
  //   }
  // }

  render() {
<<<<<<< HEAD
    console.log("render button");
=======
    console.log('render button', this.epyclass)
>>>>>>> a2430c683c730a0666711ba76b9737dbb0475721

    return (
      <button
        class={this.epyclass}
        disabled={this.epyclass.includes("disabled")}
        onClick={(event: UIEvent) => this.clickButtonHandler(event)}
      >
        <slot></slot>
      </button>
    );
  }
}
