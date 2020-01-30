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

  @Event() valueChange: EventEmitter;

  handleValueChange(value) {
    this.valueChange.emit(value);
  }

  render() {
    return (
      <div class="radio">
        {!this.disabled ? (
          <input
            type="radio"
            name={this.name}
            value={this.value}
            onChange={() => this.handleValueChange(this.value)}
          />
        ) : (
          <input type="radio" name={this.name} value={this.value} disabled />
        )}

        <label htmlFor="radio">
          <span></span>
        </label>
        <span class="content-text-style">{this.label}</span>
      </div>
    );
  }
}
