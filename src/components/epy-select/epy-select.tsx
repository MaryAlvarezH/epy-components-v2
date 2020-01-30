import {
  Component,
  Element,
  Prop,
  Event,
  h,
  EventEmitter,
  State,
  Listen,
  Watch
} from "@stencil/core";
import { createPopper } from "@popperjs/core";

export interface SelectItem {
  label: string;
  value: any;
  selected?: boolean;
  highlight?: boolean; // this is for styling keyboard option highlighting.
  index?: number; // 1:1 relation index for options and vOptions to manage state on filtering.
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
  // filterSlot: HTMLElement;
  selectEl!: HTMLElement;
  query = "";
  selectedIndex: number;
  optionsElems: HTMLCollectionOf<Element>;

  // this is for styling keyboard option highlighting
  @State() private _highlightIndex: number = -1;
  set highlightIndex(v) {
    if (v >= -1 && (this.vOptions && v < this.vOptions.length))
      this._highlightIndex = v;
  }
  get highlightIndex() { return this._highlightIndex }

  // index to manage iteration when arrows are pressed and there are filtered options 
  private _navigateIndex = -1;
  set navigateIndex(v) {
    if (v >= -1 && (this.vOptions && v < (this.filteredOptions ? this.filteredOptions.length : this.vOptions.length)))
      this._navigateIndex = v;
  }
  get navigateIndex() { return this._navigateIndex }
  
  // resets the highlighting
  reseNavigationIndexes(){
    if (this.vOptions[this.highlightIndex]) {
      this.vOptions[this.highlightIndex].highlight = false;
      this.highlightIndex = -1;
    }
    if (this.vOptions[this.navigateIndex]) {
      this.vOptions[this.navigateIndex].highlight = false;
      this.navigateIndex = -1;
    }
  }


  // Popper 
  private trigger: HTMLElement;
  private content: HTMLElement;

  @Watch('options')// transform string array to SelectItem array options
  passOptions(newOptionsValue) {
    this.vOptions = this.options.map((o, i) => {
      if (typeof o === 'string') {
        return { value: o, label: o, index: i }
      } else {
        o.index = i;
        return o;
      };
    })
    this.optionsElems = this.el.getElementsByClassName('option');
  }

  @Listen("mousedown", { target: "window" })
  closeOnOutsideClick(e) {
    if (!this.el.contains(e.target)) {
      this.reseNavigationIndexes()
      this.setIsOpen(false);
      this.query = "";
      this.filteredOptions = null;
    }
  }

  @Listen("keydown", { target: "parent" })
  navigateOptions(event) {
    if (!this.isOpen)
      return
    // Check for up/down key presses
    let opts = this.filteredOptions ? this.filteredOptions : this.vOptions
    switch (event.keyCode) {
      case 38: // Up arrow    
        // Remove the highlighting from the previous element
        if (this.navigateIndex > -1)
          opts[this.navigateIndex].highlight = false;
        --this.navigateIndex; // Decrease the counter
        if (opts[this.navigateIndex]) { // Highlight the new element
          opts[this.navigateIndex].highlight = true;
          this.highlightIndex = opts[this.navigateIndex].index;
        }
        break;
      case 40: // Down arrow
        if (this.navigateIndex > -1)
          opts[this.navigateIndex].highlight = false; // Remove the highlighting from the previous element
        ++this.navigateIndex; // Increase counter 
        console.log('indexes:', this.highlightIndex, this.navigateIndex);
        if (opts[this.navigateIndex]) { // Highlight the new element
          opts[this.navigateIndex].highlight = true;
          this.highlightIndex = opts[this.navigateIndex].index;
        }
        break;
      case 13:
        this.select(this.vOptions[this.highlightIndex]);
        break;
    }
    if (this.highlightIndex > -1) { // Show option if it is not visible
      if (this.optionsElems[this.highlightIndex])
        this.optionsElems[this.highlightIndex].scrollIntoView();
      console.log(this.optionsElems[this.highlightIndex]);
    }
    console.log('indexes:', this.highlightIndex, this.navigateIndex);

  }

  componentWillLoad() {
    this.filteredOptions = null;
    // this.filterSlot = this.el.querySelector('[slot="filter"]'); //TODO: test filter slot  
    this.vOptions = this.options.map((o, i) => {
      if (typeof o === 'string') {
        return { value: o, label: o, index: i }
      } else {
        o.index = i;
        return o;
      };
    })
    this.optionsElems = this.el.getElementsByClassName('option');
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

  select(option: SelectItem) {
    this.value = option;
    if (!isNaN(this.selectedIndex)) {
      this.vOptions[this.selectedIndex].selected = false; //remove previously selected flag
    }
    option.selected = true;
    this.selectedIndex = option.index;
    this.setIsOpen(false);
    this.query = "";
    this.filteredOptions = null;
    this.reseNavigationIndexes();
    this.selectChange.emit(option.value);
  }

  setIsOpen(value?: boolean) {
    this.isOpen = typeof value === "boolean" ? value : !this.isOpen;
    this.isOpen
      ? this.selectEl.classList.add("active")
      : this.selectEl.classList.remove("active");
    this.highlightIndex = -1;
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
    this.reseNavigationIndexes();
    if (this.vOptions.length && query && query.length) {
      query = query.toLowerCase();
      let filtOpts = [];
      this.vOptions.map((val, i) => {
        let textValue = val.label.toLowerCase();
        if (textValue.indexOf(query) > -1) {
          // val.selected = this.selectedIndex === i;
          filtOpts.push(val)
        }
      });
      this.filteredOptions = filtOpts;
    } else {
      this.filteredOptions = null;
    }
  }

  renderOptions() {
    let showOpts = this.filteredOptions ? this.filteredOptions : this.vOptions;
    if (this.filter) {
      // TODO: keyboard accesibility (search and then arrow down + enter = selection )
      return (
        <div class="select-details">
          {/* <slot name="filter"> */}
          <epy-input
            type="input-outline"
            value={this.query}
            onEpychange={e => this.onFilter(e.detail)}
            input-type="text"
            placeholder={this.filterPlaceholder}
          >
            <i slot="content-left" class="epy-icon-search-v1 left"></i>
          </epy-input>
          {/* </slot> */}
          <div class="options-container">
            {showOpts.length ? (
              showOpts.map((o: any, i: number) =>
                <span class={`option ${o.selected ? 'selected' : ''} ${o.highlight ? 'highlight' : ''}`} onClick={() => this.select(o)}>
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
                return (
                  <span class={`option ${o.selected ? 'selected' : ''} ${o.highlight ? 'highlight' : ''}`} onClick={() => this.select(o)}>
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
