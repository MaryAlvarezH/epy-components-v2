import {
  Component,
  Element,
  Prop,
  Event,
  h,
  EventEmitter,
  State,
  Listen
} from "@stencil/core";
import { createPopper } from "@popperjs/core";

export interface SelectItem {
  label: string;
  value: any;
  selected?: boolean;
}

@Component({
  tag: "epy-select",
  styleUrl: "epy-select.css",
  shadow: false
})
export class EpySelect {
  @Prop() epyClass: string = "select-outline";
  @Prop() textColor: string;
  @Prop() placeholder: string = "Select an option";
  @Prop() filterPlaceholder: string = "Search";
  @Prop() options: Array<string | SelectItem> = [];
  @Prop({ reflect: true }) value: any;
  @Prop() label: string;
  @Prop() labelHelper: string;
  @Prop() filter = false; // filters by label by default
  @Prop() notFoundCopy = "Nothing found";
  @Prop() leftIcon: string;
  @Prop() rightIcon = "arrow";

  @State() isOpen = false;
  @Event() selectChange: EventEmitter;
  @Element() el: HTMLElement;
  @State() filteredOptions: Array<SelectItem> = null;

  vOptions: Array<SelectItem>; // These are the mutable options used internally
  filterSlot: HTMLElement;
  selectEl!: HTMLElement;
  query = "";
  selectedIndex: number;

  //popper
  private trigger: HTMLElement;
  private content: HTMLElement;

  @Listen("mousedown", { target: "window" })
  closeOnOutsideClick(e) {
    if (!this.el.contains(e.target)) {
      this.setIsOpen(false);
      this.query = "";
      this.filteredOptions = null;
    }
  }

  componentWillLoad() {
    this.filteredOptions = null;
    this.filterSlot = this.el.querySelector('[slot="filter"]');
    // transform string array to SelectItem array options
    this.vOptions = this.options.map(o => {
      return typeof o === 'string' ? { value: o, label: o } : o;
    })
  }

  componentDidLoad() {
    this.trigger = this.el.querySelector(".select-trigger");
    this.content = this.el.querySelector(".select-details");
  }

  loadPopper() {
    createPopper(this.trigger, this.content, {
      placement: "bottom-start",
      modifiers: [
        {
          name: "preventOverflow",
          options: {
            mainAxis: false
          }
        }
      ]
    });
  }

  select(option: string | SelectItem, index: number) {
    this.value = option;
    this.selectedIndex = index;
    this.setIsOpen(false);
    this.query = "";
    this.filteredOptions = null;
    this.selectChange.emit(typeof option === "string" ? option : option.value);
  }

  setIsOpen(value?: boolean) {
    this.isOpen = typeof value === "boolean" ? value : !this.isOpen;
    this.isOpen
      ? this.selectEl.classList.add("active")
      : this.selectEl.classList.remove("active");
  }

  printValue() {
    return this.value
      ? typeof this.value === "string"
        ? this.value
        : this.value.label
      : this.placeholder;
  }

  onFilter(query: string) {
    this.query = query;
    if (this.vOptions.length && query && query.length) {
      query = query.toLowerCase();
      let filtOpts = [];
      this.vOptions.map((val, i) => {
        let textValue = val.label.toLowerCase();
        if (textValue.indexOf(query) > -1) {
          val.selected = this.selectedIndex === i;
          filtOpts.push(val)
        }
      });
      this.filteredOptions = filtOpts;
    } else {
      this.filteredOptions = null;
    }
  }

  renderOptions() {
    let showOpts = this.filteredOptions ? this.filteredOptions : this.vOptions,
    isLessLength = showOpts.length < this.vOptions.length;
    if (this.filter) {
      // TODO: keyboard accesibility (search and then arrow down + enter = selection )
      return (
        <div class="select-details">
          <slot name="filter">
            <epy-input
              type="input-outline"
              value={this.query}
              onEpychange={e => this.onFilter(e.detail)}
              input-type="text"
              placeholder={this.filterPlaceholder}
            >
              <i slot="content-left" class="epy-icon-search-v1 left"></i>
            </epy-input>
          </slot>
          <div class="options-container">
            {showOpts.length ? (
              showOpts.map((o: any, i: number) =>
                <span class={(isLessLength ? o.selected : (this.selectedIndex === i)) ? 'option selected' : 'option'} onClick={() => this.select(o, i)}>
                  {typeof o === "string" ? o : o.label}
                </span>
              )
            ) : (
                <p class="text-suggest">{this.notFoundCopy}</p>
              )}
          </div>
        </div>
      );
    } else {
      return (
        <div class="select-details" role="tooltip">
          <div class="options-container">
            {
              this.vOptions.map((o: any, i: number) => {
                let optclass = (this.selectedIndex === i) ? 'option selected' : 'option';
                return (
                  <span class={optclass} onClick={() => this.select(o, i)}>
                    {typeof o === "string" ? o : o.label}
                  </span>
                )
              })
            }
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div
        class={`select ${this.epyClass}`}
        ref={el => (this.selectEl = el as HTMLElement)}
      >
        <div class="select-container">
          {this.label || this.labelHelper ? (
            <div class="title-container">
              {this.label ? (
                <label
                  class={{
                    "select-label upper": this.epyClass.includes("outline"),
                    "select-label": !this.epyClass.includes("outline")
                  }}
                >
                  {this.label}
                </label>
              ) : null}
              {this.labelHelper ? (
                <label class="select-helper">{this.labelHelper}</label>
              ) : null}
            </div>
          ) : null}

          {this.loadPopper()}

          <div class="select-trigger" onClick={() => this.setIsOpen()}>
            {this.leftIcon ? <i class={this.leftIcon + " left"}></i> : null}
            <div class="select-value">
              <slot>
                <span class={this.textColor ? "text-" + this.textColor : ""}>
                  {this.printValue()}
                </span>
              </slot>
            </div>
            <span class={this.rightIcon + " right"}></span>
          </div>
          {this.renderOptions()}
        </div>
      </div>
    );
  }
}
