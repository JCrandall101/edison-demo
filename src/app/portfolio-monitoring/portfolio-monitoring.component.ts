import { Component, OnInit, ElementRef } from '@angular/core';

declare var Plotly: any;

@Component({
  selector: 'app-portfolio-monitoring',
  templateUrl: './portfolio-monitoring.component.html',
  styleUrls: ['./portfolio-monitoring.component.css']
})
export class PortfolioMonitoringComponent implements OnInit {
  lineData:any;
  linePlotName: string = 'linePlotDiv';
  _myPlot: CustomHTMLElement;

  trace1:any;
  trace2:any;
  lineLayout:any = {};
  plotlyOptions: any = {
      displaylogo: false,
      modeBarButtonsToRemove: [
        'lasso2d',//Lasso Select
        'toggleSpikelines', //Toggle Spike
        'select2d', //Box Select
        'sendDataToCloud', //Save and Sent to Cloud
        'resetScale2d' //Reset axes
      ]
    };

  constructor() { }

  ngOnInit() {
    this.trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        type: 'scatter',
        name: 'Standard Microgrid'
      };
    this.trace2 = {
        x: [1, 2, 3, 4],
        y: [16, 5, 11, 9],
        type: 'scatter',
        name: 'Fenix'
      };
    this.lineData = [this.trace1, this.trace2];
    this.lineLayout = {
      title: 'Number of Subscriptions',
      xaxis: {
        title: 'Months'
      },
      yaxis: {
        title: 'Subscritions'
      }
    }
  }

  ngAfterViewInit(){
      Plotly.newPlot(this.linePlotName, this.lineData, this.lineLayout, this.plotlyOptions);
    }
  ngAfterViewChecked(){
    if(document.getElementById(this.linePlotName)){
      if(!this._myPlot){
        this._myPlot = <CustomHTMLElement>document.getElementById(this.linePlotName);
        let _this = this;
        this._myPlot.on('plotly_click',function(data){
          _this.onClick(data);
          return;
        });
      }
    }
  }

  onClick(e){
    console.log(e);
  }

//     var trace1 = {
//   x: [1, 2, 3, 4],
//   y: [10, 15, 13, 17],
//   type: 'scatter'
// };
// var trace2 = {
//   x: [1, 2, 3, 4],
//   y: [16, 5, 11, 9],
//   type: 'scatter'
// };
// var data = [trace1, trace2];
// Plotly.newPlot('myDiv', data);

}

export class CustomHTMLElement extends HTMLElement {
  constructor() {
    super();
  }
  on(event_type, cb) {
  }
}
