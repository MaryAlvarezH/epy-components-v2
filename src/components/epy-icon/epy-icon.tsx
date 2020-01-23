import { Component, h, Prop } from "@stencil/core";
// import "../../../node_modules/epy-scss/dist/assets/symbol-defs.svg";
// import ref from "../../../node_modules/epy-scss/dist/assets/epy-icons.svg";

@Component({
  tag: "epy-icon",
  styleUrl: "epy-icon.scss",
  shadow: false
})
export class Icon {
  @Prop() icon: string;
  // @Prop({ context: "publicPath" }) private publicPath: string;
  href: string = `/assets/symbol-defs.svg#${this.icon}`;
  // href: string = `../../../node_modules/epy-scss/dist/assets/epy-icons.svg#${this.icon}`;
  render() {
    // console.log("publicPath", this.publicPath);
    return (
      <svg>
        <use xlinkHref={this.href}></use>
      </svg>
    );
  }
}
