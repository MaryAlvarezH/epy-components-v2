import {
  Component,
  h,
  Prop,
  Element,
  Event,
  EventEmitter
} from "@stencil/core";
import { HTMLStencilElement } from "@stencil/core/internal";

@Component({
  tag: "epy-input",
  styleUrl: "epy-input.scss",
  shadow: false
})
export class EpyInput {
  @Prop() type: string;

  // Content props
  @Prop() label: string;
  @Prop() labelHelper: string;
  @Prop() errorLabel: string;
  @Prop() requiredLabel: string;

  // Input props
  @Prop() placeholder: string;
  @Prop({ mutable: true }) value: any;
  @Prop() inputType: string;
  @Prop() maxlength: number;
  @Prop() minlength: number;
  @Prop() disabled: boolean;
  @Prop() rows: number;
  @Prop() clear: boolean;
  @Prop() required: boolean;

  // Aux props
  @Prop() validationStatus: string; // invalid or requireq

  hasUnitSlot: boolean;
  hasSuffixSlot: boolean;

  inputHeight: number;
  inputClass: string;

  show: boolean;

  // Slots
  @Element() hostElement: HTMLStencilElement;

  hasContentLeftSlot: boolean;
  hasContentRightSlot: boolean;

  // Events
  @Event() epychange: EventEmitter<any>;

  handleChange(ev) {
    if (
      (this.type && !this.type.includes("disabled")) ||
      !this.disabled ||
      !this.type
    ) {
      this.show = true;
      this.value = ev.target ? ev.target.value : null;
      this.epychange.emit(this.value);
    }
  }

  setInputHeight(ev) {
    if (ev.target.value) {
      ev.target.style.height = ev.target.scrollHeight + "px";
    } else {
      ev.target.style.height = "104px";
    }
  }

  resetValue(ev) {
    this.value = ev.target ? ev.target.value : null;
    this.value = "";
    this.epychange.emit(this.value);
  }

  getInputClass() {
    this.inputClass = "input-text";

    if (this.type && this.type.includes("disabled")) {
      this.inputClass = this.inputClass + " disabled";
    }

    if (this.type && this.type.includes("invalid")) {
      this.validationStatus === "invalid";
    }
  }

  componentWillLoad() {
    this.value = this.value ? this.value : "";

    this.hasContentLeftSlot = !!this.hostElement.querySelector(
      '[slot="content-left"]'
    );
    this.hasContentRightSlot = !!this.hostElement.querySelector(
      '[slot="content-right"]'
    );
    this.hasUnitSlot = !!this.hostElement.querySelector(
      '[slot="content-unit"]'
    );
    this.hasSuffixSlot = !!this.hostElement.querySelector(
      '[slot="content-suffix"]'
    );
  }

  render() {
    if(this.errorLabel) { var error = true };
    return (
      <div class={"input " + this.type}>
        {this.label || this.labelHelper ? (
          <div class="title-container">
            {this.required ? (
              <label class="text-red">*</label>
            ) : null}
            {this.label ? ( <label class={{ "input-label upper": this.type && this.type.includes("outline"), "input-label": (this.type && !this.type.includes("outline")) || !this.type, "input-label text-red": (this.type && !this.type.includes("outline") && error) }}> {this.label} </label> ) : null}
            {this.labelHelper ? ( <label class="input-helper">{this.labelHelper}</label> ) : null}
          </div>
        ) : null}

        {this.getInputClass()}

        <div
          class={{
            "input-container":
              !this.hasContentLeftSlot && !this.hasContentRightSlot,
            "input-container content-left":
              this.hasContentLeftSlot && !this.hasContentRightSlot,
            "input-container content-right":
              !this.hasContentLeftSlot && this.hasContentRightSlot,
            "input-container content-asides":
              this.hasContentLeftSlot && this.hasContentRightSlot,
            "input-container unit-suffix":
              this.hasUnitSlot || this.hasSuffixSlot
          }}
        >
          <slot name="content-left" />
          <slot name="content-unit" />

          {!this.rows ? (
            <input
              class={this.inputClass}
              placeholder={this.placeholder}
              type={this.inputType}
              maxlength={this.maxlength}
              minlength={this.minlength}
              disabled={this.disabled}
              value={this.value}
              onInput={ev => this.handleChange(ev)}
            />
          ) : (
            <textarea
              class={this.inputClass}
              placeholder={this.placeholder}
              maxlength={this.maxlength}
              minlength={this.minlength}
              disabled={this.disabled}
              value={this.value}
              onKeyUp={(ev: UIEvent) => this.setInputHeight(ev)}
              onKeyDown={(ev: UIEvent) => this.setInputHeight(ev)}
              onInput={ev => this.handleChange(ev)}
            />
          )}

          {this.clear ? (
            <i
              slot="content-right"
              onClick={ev => this.handleChange(ev)}
              class="epy-icon-x clean right"
            ></i>
          ) : (
            <slot name="content-right" />
          )}
          <slot name="content-suffix" />
        </div>
        <div class="input-aux-container">
          {this.errorLabel ? ( <div class="helper-text"> {this.errorLabel} </div> ) : null}
          {this.maxlength && this.show ? ( <div class={"number " + (this.errorLabel ? 'text-red' : null) }> {" "} {this.value.length} / {this.maxlength} {" "} </div>) : null}
        </div>
      </div>
    );
  }
}
