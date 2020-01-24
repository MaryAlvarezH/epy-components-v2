import { Component, h, Prop, Element, Event, EventEmitter } from "@stencil/core";
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

  // Aux props
  @Prop() validationStatus: string; // invalid or requireq

  hasContentLeftSlot: boolean;
  hasContentRightSlot: boolean;

  hasUnitSlot: boolean;
  hasSuffixSlot: boolean;

  inputHeight: number;
  inputClass: string;

  @Element() hostElement: HTMLStencilElement;
  @Event() changed: EventEmitter<any>;

  handleChange(ev) {
    this.value = ev.target ? ev.target.value : null;
    this.changed.emit(this.value);
  }

  setInputHeight(e) {
    console.log(e.target.scrollHeight);
    let scrollSize = e.target.scrollHeight;

    e.target.style.height = scrollSize + "px";
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

  resetValue(ev) {
    this.value = ev.target ? ev.target.value : null;
    this.value = '';
    this.changed.emit(this.value);
  }

  componentWillLoad() {
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
    this.value = this.value ? this.value : '';

    return (
      <div class={"input " + this.type}>
        {this.label || this.labelHelper ? (
          <div class="title-container">
            {this.label ? (
              <label
                class={{
                  "input-label upper":
                    this.type && this.type.includes("outline"),
                  "input-label":
                    (this.type && !this.type.includes("outline")) || !this.type
                }}
              >
                {this.label}
              </label>
            ) : null}
            {this.labelHelper ? (
              <label class="input-helper">{this.labelHelper}</label>
            ) : null}
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
              value={this.value}
              placeholder={this.placeholder}
              type={this.inputType}
              maxlength={this.maxlength}
              minlength={this.minlength}
              disabled={this.disabled}
              onInput={(ev) => this.handleChange(ev)}
            />
          ) : (
              <textarea
                class={this.inputClass}
                value={this.value}
                placeholder={this.placeholder}
                maxlength={this.maxlength}
                minlength={this.minlength}
                disabled={this.disabled}
                onKeyUp={(event: UIEvent) => this.setInputHeight(event)}
                onKeyDown={(event: UIEvent) => this.setInputHeight(event)}
                onInput={(ev) => this.handleChange(ev)}
              />
            )}

          {this.clear ? (<i slot="content-right" onClick={(ev) => this.handleChange(ev)} class="epy-icon-x clean right" ></i> ) : (<slot name="content-right" />) }
          <slot name="content-suffix" />
        </div>
        <div class="input-aux-container">
          {
            this.errorLabel ? (<div class="helper-text"> {this.errorLabel} </div>) : null
          }
          {
            this.maxlength ? (<div class="number"> {this.value.length} /  {this.maxlength}  </div>) : null
          }
        </div>


      </div>
    );
  }
}
