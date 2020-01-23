import { Component, Host, Prop, Event, h, EventEmitter, State } from '@stencil/core';

@Component({
  tag: 'epy-select',
  styleUrl: 'epy-select.css',
  shadow: false
})
export class EpySelect {

  @Prop() placeholder: string = 'placeholder';
  @Prop() options: string[];
  @State() isOpen = false;
  @Event() selectChange: EventEmitter;

  select(option: string) {
    this.selectChange.emit(option);
  }

  setIsOpen() {
    this.isOpen = !this.isOpen
  }

  render() {
    console.log('rendering', this);
    return (
      <div class={'select select-primary ' + (this.isOpen ? 'active' : '')}>
        <div class="select-container">
          <div class="select-trigger" onClick={() => this.setIsOpen()}>
            <div class="select-value">
              <slot name="selected">
                <span>{this.placeholder}</span>
              </slot>
            </div>
            <div class="arrow arrow-open"></div>
          </div>
          <ul class="options-container">
            {
              this.options
                ? this.options.map(o => <li class="option" onClick={() => this.select(o)} >{o}</li>)
                : (<slot></slot>)
            }
          </ul>
        </div>
      </div>
    );
  }

}
