import { Component, h, Prop, Element, State } from "@stencil/core";
import { HTMLStencilElement } from "@stencil/core/internal";
import { createPopper } from "@popperjs/core";

@Component({
  tag: "epy-tooltip",
  styleUrl: "epy-tooltip.scss",
  shadow: false
})
export class Tooltip {
  // Popperjs behaivor
  @Prop() placement;
  @Prop() skidding: number;
  @Prop() distance: number;

  @Element() private el: HTMLStencilElement;
  @State() private tooltipActive: boolean;

  private trigger: HTMLElement;
  private tooltip: HTMLElement;

  componentDidLoad() {
    this.trigger = this.el.querySelector(".tooltip-trigger");
    this.tooltip = this.el.querySelector(".tooltip-content");
  }

  loadPopper() {
    createPopper(this.trigger, this.tooltip, {
      placement: this.placement ? this.placement : "bottom",
      modifiers: [
        {
          name: "offset",

          options: {
            offset: [
              this.skidding ? this.skidding : 0,
              this.distance ? this.distance : 4
            ]
          }
        }
      ]
    });
  }

  render() {
    return (
      <div
        class={{
          "tooltip active": this.tooltipActive,
          "tooltip ": !this.tooltipActive
        }}
        tabindex="0"
        onBlur={() => (this.tooltipActive = false)}
      >
        {this.loadPopper()}

        <div
          class="tooltip-trigger"
          onMouseOver={() => (this.tooltipActive = true)}
          onMouseOut={() => (this.tooltipActive = false)}
        >
          <slot name="trigger"></slot>
        </div>

        <div role="tooltip" class="tooltip-content">
          <slot></slot>
        </div>
      </div>
    );
  }
}
