import { Component, Prop, Element, h, State } from "@stencil/core";
import { HTMLStencilElement } from "@stencil/core/internal";
import { createPopper } from "@popperjs/core";

@Component({
  tag: "epy-popover",
  styleUrl: "epy-popover.scss",
  shadow: false
})
export class Popover {
  // Component properties
  @Prop() triggerEvent: string; // click or hover (default -> hover
  @Prop() width: string;

  // Popperjs behaivor
  @Prop() placement;
  @Prop() skidding: number;
  @Prop() distance: number;

  @Element() private el: HTMLStencilElement;
  @State() private cardPanelActive: boolean;

  private trigger: HTMLElement;
  private tooltip: HTMLElement;
  private hasIconSlot: boolean;

  componentWillLoad() {
    this.hasIconSlot = !!this.el.querySelector('[slot="trigger"]');
  }

  componentDidLoad() {
    this.trigger = this.el.querySelector(".popover-trigger");
    this.tooltip = this.el.querySelector(".popover-content");
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

  setStateTrigger(state, event) {
    if (
      this.triggerEvent &&
      this.triggerEvent === "click" &&
      event == "click"
    ) {
      this.cardPanelActive = state;
    } else if (
      ((this.triggerEvent && this.triggerEvent === "hover") ||
        !this.triggerEvent) &&
      event === "hover"
    ) {
      this.cardPanelActive = state;
    }
  }

  render() {
    return (
      <div
        class={{
          "popover active": this.cardPanelActive,
          "popover ": !this.cardPanelActive
        }}
        tabindex="0"
        onBlur={() => (this.cardPanelActive = false)}
      >
        {this.loadPopper()}

        <div
          class="popover-trigger"
          onMouseOver={() => this.setStateTrigger(true, "hover")}
          onMouseOut={() => this.setStateTrigger(false, "hover")}
          onClick={() => this.setStateTrigger(!this.cardPanelActive, "click")}
        >
          {!this.hasIconSlot ? (
            <i class="epy-icon-help"></i>
          ) : (
            <slot name="trigger"></slot>
          )}
        </div>

        <div
          role="tooltip"
          class="popover-content"
          style={{
            width: this.width ? this.width : "100%"
          }}
        >
          <slot></slot>
        </div>
      </div>
    );
  }
}
