import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: 'epy-checkbox',
  styleUrl: 'epy-checkbox.scss',
  shadow: true
})
export class Checkbox {
  checkboxInput: HTMLInputElement;

  @Prop() label: string = "";
  @Prop({ mutable: true, reflect: true }) isChecked: boolean = false;
  @Prop() disabled: boolean;

  @Event({
    eventName: "checkedEvent",
    bubbles: true,
    composed: true,
    cancelable: true
  })
  checkedChangeEmitter: EventEmitter;

  checkedChangeHandler(checked: boolean) {
    console.log('click');
    this.checkedChangeEmitter.emit({ checked });
  }

  componentDidLoad() {
    console.log(this.checkboxInput);
  }

  render() {
    return (
      <form>
          <div class="flex-center-vertically">
            <input
              class={{"disabled": this.disabled}}
              type="checkbox"
              disabled={this.disabled}
              checked={this.isChecked}
              ref={el => (this.checkboxInput = el as HTMLInputElement)}
              onChange={() =>
                this.checkedChangeHandler(this.checkboxInput.checked)
              }
            />
            <label htmlFor="checkbox" class={{"disabled": this.disabled}}>
              <span class={{"disabled": this.disabled}}></span>
            </label>
            <span class="content-text-style">{this.label}</span>
          </div>
        </form>
    );
  }
}