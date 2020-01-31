import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "epy-checkbox",
  styleUrl: "epy-checkbox.scss",
  shadow: false
})
export class Checkbox {
  checkboxInput: HTMLInputElement;

  @Prop() name: string;
  @Prop() value: string;
  @Prop() label: string;
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;
  @Prop() disabled: boolean;

  // @Event({
  //   eventName: "checkedEvent",
  //   bubbles: true,
  //   composed: true,
  //   cancelable: true
  // })
  @Event() valueChange: EventEmitter;

  checkedChangeHandler(checked: boolean) {
    console.log("checked", checked);
    this.valueChange.emit(checked);
  }

  render() {
    return (
      <div class="checkbox">
        <input
          type="checkbox"
          name={this.name}
          value={this.value}
          disabled={this.disabled}
          checked={this.checked}
          ref={el => (this.checkboxInput = el as HTMLInputElement)}
          onChange={() => this.checkedChangeHandler(this.checkboxInput.checked)}
        />
        <label htmlFor="checkbox">
          <span></span>
        </label>
        <span>{this.label}</span>
      </div>
    );
  }
}
