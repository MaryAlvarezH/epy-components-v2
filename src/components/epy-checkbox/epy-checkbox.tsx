import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "epy-checkbox",
  styleUrl: "epy-checkbox.scss",
  shadow: true
})
export class Checkbox {
  checkboxInput: HTMLInputElement;

  @Prop() label: string = "";
  @Prop({ mutable: true, reflect: true }) isChecked: boolean = false;

  @Event({
    eventName: "checkedEvent",
    bubbles: true,
    composed: true,
    cancelable: true
  })
  checkedChangeEmitter: EventEmitter;

  checkedChangeHandler(checked: boolean) {
    console.log("click");
    this.checkedChangeEmitter.emit({ checked });
  }

  componentDidLoad() {
    console.log(this.checkboxInput);
  }

  render() {
    return (
      <form>
        <div class="checkbox">
          <input
            class="message"
            type="checkbox"
            checked={this.isChecked}
            ref={el => (this.checkboxInput = el as HTMLInputElement)}
            onChange={() =>
              this.checkedChangeHandler(this.checkboxInput.checked)
            }
          />
          <label htmlFor="checkbox">
            <span></span>
          </label>
          <span class="content-text-style">{this.label}</span>
        </div>
      </form>
    );
  }
}
