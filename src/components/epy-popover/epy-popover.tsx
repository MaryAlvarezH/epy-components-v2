import { Component, Prop, Element, h } from "@stencil/core";
import { HTMLStencilElement } from "@stencil/core/internal";
import { reflect } from "stencil-reflector";
import { createPopper } from "@popperjs/core";

@Component({
  tag: "epy-popover",
  styleUrl: "epy-popover.scss",
  shadow: false
})
export class Popover {
  @Element() private el: HTMLStencilElement;

  @Prop() triggerEvent: string; // click or hover (default -> hover)

  // Popperjs behaivor
  @Prop() placement;

  // @reflect decorator helps to update the element reference in the DOM
  // https://github.com/RienNeVaPlus/stencil-reflector

  @reflect private cardPanelState: boolean;

  private trigger: HTMLElement;
  private tooltip: HTMLElement;
  private hasIconSlot: boolean;

  componentWillLoad() {
    this.hasIconSlot = !!this.el.querySelector('[slot="trigger"]');
  }

  componentDidLoad() {
    this.trigger = this.el.querySelector(".popover-trigger");
    this.tooltip = this.el.querySelector(".popover-details");
  }

  loadPopper() {
    createPopper(this.trigger, this.tooltip, {
      placement: this.placement ? this.placement : "bottom",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 4]
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
      this.cardPanelState = state;
    } else if (
      ((this.triggerEvent && this.triggerEvent === "hover") ||
        !this.triggerEvent) &&
      event === "hover"
    ) {
      this.cardPanelState = state;
    }
  }

  render() {
    return (
      <div
        class="popover-container"
        tabindex="0"
        onBlur={() => (this.cardPanelState = false)}
      >
        {this.loadPopper()}

        <div
          class="popover-trigger"
          onMouseOver={() => this.setStateTrigger(true, "hover")}
          onMouseOut={() => this.setStateTrigger(false, "hover")}
          onClick={() => this.setStateTrigger(!this.cardPanelState, "click")}
        >
          {!this.hasIconSlot ? (
            <i class="epy-icon-help"></i>
          ) : (
            <slot name="trigger"></slot>
          )}
        </div>

        <div
          role="tooltip"
          class={{
            "popover-details": this.cardPanelState,
            "popover-details hidden": !this.cardPanelState
          }}
        >
          <slot></slot>
        </div>
      </div>
    );
  }
}
