import { Component, h, Prop, Event } from "@stencil/core";
import { EventEmitter } from "events";

@Component({
  tag: "epy-radio",
  styleUrl: "epy-radio.scss",
  shadow: false
})
export class Radio {
  @Prop() name: string;
  @Prop() value: any;
  @Prop() disabled: boolean = false;
  @Prop() label: string;
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;

  @Event() valueChanges: EventEmitter;
  radioInput: HTMLInputElement;

  handleValueChange(value) {
    this.valueChanges.emit(value);
    console.log("check radio", value);
  }

  render() {
    return (
      <div class="radio">
        <input
          type="radio"
          name={this.name}
          value={this.value}
          onChange={() => this.handleValueChange(this.radioInput.value)}
          checked={this.checked}
          ref={el => (this.radioInput = el as HTMLInputElement)}
          disabled={this.disabled}
        />

        <label htmlFor="radio">
          <span></span>
        </label>
        <span>{this.label}</span>
      </div>
    );
  }
}
