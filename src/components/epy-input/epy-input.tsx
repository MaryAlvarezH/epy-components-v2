import { Component, h, Prop, Element } from "@stencil/core";
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
  @Prop() errorLegend: String;
  @Prop() requiredLegend: string;

  // Input props
  @Prop() placeholder: string;
  @Prop() value: any;
  @Prop() inputType: string;
  @Prop() maxlength: number;
  @Prop() minlength: number;
  @Prop() disabled: boolean;
  // minle

  // Aux props
  @Prop() validationStatus: string; // invalid or required

  inputClass: string;

  hasContentLeftSlot: boolean;
  hasContentRightSlot: boolean;

  @Element() hostElement: HTMLStencilElement;

  componentWillLoad() {
    this.hasContentLeftSlot = !!this.hostElement.querySelector(
      '[slot="content-left"]'
    );
    this.hasContentRightSlot = !!this.hostElement.querySelector(
      '[slot="content-right"]'
    );
  }

  render() {
    // this.loadInputClass();
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

        <div
          class={{
            "input-container":
              !this.hasContentLeftSlot && !this.hasContentRightSlot,
            "input-container content-left":
              this.hasContentLeftSlot && !this.hasContentRightSlot,
            "input-container content-right":
              !this.hasContentLeftSlot && this.hasContentRightSlot,
            "input-container content-asides":
              this.hasContentLeftSlot && this.hasContentRightSlot
          }}
        >
          <slot name="content-left" />
          <input
            class={{
              "input-text disabled":
                this.type && this.type.includes("disabled"),
              "input-text invalid": this.validationStatus === "invalid",
              "input-text":
                !this.type ||
                (this.type &&
                  !this.type.includes("disabled") &&
                  this.validationStatus !== "invalid")
            }}
            value={this.value}
            placeholder={this.placeholder}
            type={this.inputType}
            maxlength={this.maxlength}
            minlength={this.minlength}
            disabled={this.disabled}
          />
          <slot name="content-right" />
        </div>
      </div>
    );
  }
}
