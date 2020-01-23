import { Component, h, Prop, Element } from "@stencil/core";
import { HTMLStencilElement } from "@stencil/core/internal";

@Component({
  tag: "epy-input",
  styleUrl: "epy-input.scss",
  shadow: false
})
export class EpyInput {
  @Prop() epyclass: string;

  // Content props
  @Prop() label: string;
  @Prop() labelHelper: string;
  @Prop() errorLegend: String;
  @Prop() requiredLegend: string;

  // Input props
  @Prop() placeholder: string;
  @Prop() value: any;
  @Prop() type: string;
  @Prop() maxLength: string;
  // minle

  // Aux props
  @Prop() validationStatus: string; // invalid or required

  hasContentLeftSlot: boolean;
  hasContentRightSlot: boolean;

  @Element() hostElement: HTMLStencilElement;
  // @Element() contentRight: HTMLStencilElement;

  componentWillLoad() {
    this.hasContentLeftSlot = !!this.hostElement.querySelector(
      '[slot="content-left"]'
    );
    this.hasContentRightSlot = !!this.hostElement.querySelector(
      '[slot="content-right"]'
    );
  }

  render() {
    console.log("hasContentLeftSlot", this.hasContentLeftSlot);
    console.log("hasContentRightSlot", this.hasContentRightSlot);
    return (
      <div class={this.epyclass}>
        {this.label || this.labelHelper ? (
          <div class="title-container">
            {this.label ? (
              <label
                class={{
                  "input-label upper": this.epyclass.includes("outline"),
                  "input-label": !this.epyclass.includes("outline")
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
              "input-text invalid": this.validationStatus === "invalid",
              "input-text": this.validationStatus !== "invalid"
            }}
            value={this.value}
            placeholder={this.placeholder}
            type={this.type}
          />
          <slot name="content-right" />
        </div>
      </div>
    );
  }
}
