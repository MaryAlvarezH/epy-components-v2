import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'epy-loader',
  styleUrl: 'epy-loader.scss',
  shadow: false
})
export class Loader {

  @Prop() type: string;

  renderSwitch(param) {
    switch (param) {
      case 'table-loader col2':
        return <div class={this.type}>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
        </div>;
      case 'table-loader col3':
        return <div class={this.type}>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
          <div class="bar-loader"></div>
        </div>;
      case 'table-loader col4':
        return <div class={this.type}>
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
        return <div class={this.type}>
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
        return <div class={this.type}>
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
        return <div class={this.type}>
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

      case 'campaign-details-loader':
        return <div class={this.type}>
         <div class="title-container">
          <div class="title-loader">
            <div class="bar-loader"></div>
            <div class="bar-loader"></div>
          </div>
          <div class="title-loader">
            <div class="bar-loader"></div>
            <div class="bar-loader"></div>
          </div>
          <div class="circle-loader"></div>
        </div>
        <div class="details-container">
          <div class="table-loader col2">
            <div class="bar-loader"></div>
            <div class="bar-loader"></div>
            <div class="bar-loader"></div>
            <div class="bar-loader"></div>
          </div>

          <div class="line-details">
            <div class="bar-loader"></div>
          </div>
        </div>
        </div>;
      
      case 'budget-loader': 
        return  <div class={this.type}>
        <div class="title-container">
          <div class="bar-loader title"></div>
          <div class="bar-loader detail"></div>
          <div class="bar-loader detail"></div>
        </div>
        <div class="budget-details">
          <div class="bar-loader title"></div>
          <div class="budget-days">
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>

            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>

            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>

            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>

            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>

            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
            <div class="day"></div>
          </div>
        </div>
      </div>
      default:
        return <div class={this.type}> </div>;
    }
  }

  render() {
    return (
      <div>
        {this.renderSwitch(this.type)}
      </div>
    );
  }

}
