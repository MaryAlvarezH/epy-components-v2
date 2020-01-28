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

export interface SelectItem {
  label: string;
  value: any;
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
  @Prop() rightIcon = "arrow arrow-open";

  @State() isOpen = false;
  @Event() selectChange: EventEmitter;
  @Element() el: HTMLElement;
  @State() filteredOptions: Array<string | SelectItem> = null;

  selectEl!: HTMLElement;
  query = "";

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
  }

  select(option: string | SelectItem) {
    console.log({ option });
    this.value = option;
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
    if (this.options.length && query && query.length) {
      this.query = this.query.toLowerCase();
      this.filteredOptions = this.options.filter(val => {
        let textValue = (typeof val === "string"
          ? val
          : val.label
        ).toLowerCase();
        return textValue.indexOf(query) > -1;
      });
    } else {
      this.filteredOptions = null;
    }
  }

  renderOptions() {
    console.log("options:", this.options);
    let showOpts = this.filteredOptions ? this.filteredOptions : this.options;
    if (this.filter) {
      return (
        <div class="select-details">
          <epy-input
            type="input-outline"
            value={this.query}
            onEpychange={e => this.onFilter(e.detail)}
            input-type="text"
            placeholder={this.filterPlaceholder}
          >
            <i slot="content-left" class="epy-icon-search-v1 left"></i>
          </epy-input>
          <div class="options-container">
            {showOpts.length ? (
              showOpts.map(o => (
                <slot name="option">
                  <span class="option" onClick={() => this.select(o)}>
                    {typeof o === "string" ? o : o.label}
                  </span>
                </slot>
              ))
            ) : (
              <slot name="option">
                <p class="text-suggest">{this.notFoundCopy}</p>
              </slot>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div class="select-details">
          <div class="options-container">
            {this.options.map(o => (
              <slot name="option">
                <span class="option" onClick={() => this.select(o)}>
                  {typeof o === "string" ? o : o.label}
                </span>
              </slot>
            ))}
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
          <div class="select-trigger" onClick={() => this.setIsOpen()}>
            {this.leftIcon ? <i class={this.leftIcon}></i> : null}
            <div class="select-value">
              <slot>
                <span class={this.textColor ? "text-" + this.textColor : ""}>
                  {this.printValue()}
                </span>
              </slot>
            </div>
            <span class={this.rightIcon}></span>
          </div>
          {this.renderOptions()}
        </div>
      </div>
    );
  }
}
