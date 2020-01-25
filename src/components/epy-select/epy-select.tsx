import { Component, Element, Host, Prop, Event, h, EventEmitter, State, Listen } from '@stencil/core';

export interface SelectItem {
  label: string,
  value: any
}

@Component({
  tag: 'epy-select',
  styleUrl: 'epy-select.css',
  shadow: false
})
export class EpySelect {

  @Prop() type: string = 'outline'
  @Prop() placeholder: string = 'placeholder';
  @Prop() options: Array<string|SelectItem> = [];
  @Prop({ reflect: true }) value: any;
  @Prop() label: string;
  @Prop() labelHelper: string;

  @State() isOpen = false;
  @Event() selectChange: EventEmitter;
  @Element() el: HTMLElement;

  @Listen('mousedown', { target: 'window' })
  closeOnOutsideClick(e) {
    if (!this.el.contains(e.target)) {
      this.isOpen = false;
    }
  }

  select(option: string | SelectItem) {
    console.log({ option });
    this.value = option;
    this.isOpen = false;
    this.selectChange.emit(typeof option==='string'? option: option.value);
  }

  setIsOpen() {
    this.isOpen = !this.isOpen
  }

  printValue(){
    return this.value 
      ? typeof this.value ==='string' 
        ? this.value
        : this.value.label 
      : this.placeholder
  }

  render() {
    return (
      <div class={`select select-${this.type} ${this.isOpen ? 'active' : ''}`}>
        <div class="select-container">
          {this.label || this.labelHelper ? (
            <div class="title-container">
              {this.label ? (
                <label
                  class={{
                    "select-label upper": this.type.includes("outline"),
                    "select-label": !this.type.includes("outline")
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
            <div class="select-value">
              <slot name="selected">
                <span>{this.printValue()}</span>
              </slot>
            </div>
            <div class="arrow arrow-open"></div>
          </div>
          <div class="options-container">
            {this.options.map(o => (
              <slot name="option">
                <span class="option" onClick={() => this.select(o)} >{typeof o === 'string' ? o : o.label}</span>
              </slot>
            ))}
          </div>
        </div>
      </div>
    );
  }

}
