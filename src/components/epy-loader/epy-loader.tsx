import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'epy-loader',
  styleUrl: 'epy-loader.scss',
  shadow: false
})
export class Loader {

  @Prop() epyclass: string;

  renderSwitch(param) {
    switch (param) {
      case 'table-loader col2':
        return <div class={this.epyclass}>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
        </div>;
      case 'table-loader col3':
        return <div class={this.epyclass}>
        <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          </div>;
      case 'table-loader col4':
        return <div class={this.epyclass}>
        <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          </div>;
      case 'stat-loader':
        return <div class={this.epyclass}>
        <div class="bar-loader title"></div>
          <div class="bar-loader subtitle"></div>
          <div class="table-loader col5">
            <div class="bar-loader"></div>
            <div class="bar-loader"></div>
            <div class="bar-loader"></div>
            <div class="bar-loader"></div>
            <div class="bar-loader"></div>
            <div class="bar-loader"></div>
            <div class="bar-loader"></div>
            <div class="bar-loader"></div>
            <div class="bar-loader"></div>
            <div class="bar-loader"></div>
          </div>

          <div class="bar-loader chart-loader">
            <div class="chart-stroke-1"></div>
            <div class="chart-stroke-2"></div>
            <div class="chart-stroke-3"></div>
            <div class="chart-stroke-4"></div>
            <div class="chart-stroke-5"></div>
            <div class="chart-stroke-6"></div>
          </div>
          </div>;
      case 'stat-loader-2':
        return <div class={this.epyclass}>
        <div class="divided-loader">
          <div class="title-loader">
            <div class="bar-loader content-large"></div>
            <div class="bar-loader content-large"></div>
          </div>
          <div class="table-loader-container">
            <div class="table-loader col1">
              <div class="bar-loader"></div>
              <div class="bar-loader"></div>
            </div>
            <div class="bar-divider"></div>
            <div class="table-loader col1">
              <div class="bar-loader"></div>
              <div class="bar-loader"></div>
            </div>
            <div class="bar-divider"></div>
            <div class="table-loader col1">
              <div class="bar-loader"></div>
              <div class="bar-loader"></div>
            </div>
            <div class="bar-divider"></div>
            <div class="table-loader col1">
              <div class="bar-loader"></div>
              <div class="bar-loader"></div>
            </div>
          </div>

          <div class="bar-loader chart-loader">
            <div class="chart-stroke-1"></div>
            <div class="chart-stroke-2"></div>
            <div class="chart-stroke-3"></div>
            <div class="chart-stroke-4"></div>
            <div class="chart-stroke-5"></div>
            <div class="chart-stroke-6"></div>
          </div>
        </div>
        </div>;
      case 'campaign-loader':
        return <div class={this.epyclass}>
          <div class="title-container">
            <div class="title-loader">
              <div class="bar-loader content-large"></div>
              <div class="bar-loader content-large"></div>
            </div>
            <div class="circle-loader"></div>
          </div>
          <div class="table-loader col4">
            <div class="bar-loader"></div>
            <div class="bar-loader"></div>
            <div class="bar-loader"></div>
            <div class="bar-loader"></div>
          </div>
        </div>;

case 'stat-loader':
  return <div class={this.epyclass}>
    <div class="title-container">
      <div class="title-loader">
        <div class="bar-loader content-large"></div>
        <div class="bar-loader content-large"></div>
      </div>
      <div class="circle-loader"></div>
    </div>
    <div class="table-loader col4">
      <div class="bar-loader"></div>
      <div class="bar-loader"></div>
      <div class="bar-loader"></div>
      <div class="bar-loader"></div>
    </div>
  </div>;
      default:
        return <div class={this.epyclass}> </div>;
    }
  }

  render() {
    return (
      <div>
        {this.renderSwitch(this.epyclass)}
      </div>
    );
  }

}
