import { Component, OnInit, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {AppService} from '../app.service';

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
  startDate:Date;
  endDate:Date;
  tabIndex:number = 0;

  esps:any[];

  trace1:any;
  trace2:any;
  trace3:any;
  lineLayout:any = {autosize: true};
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

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    console.log('Is IE?',this.appService.isIE());
    this.trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 12, 13, 17],
        type: 'scatter',
        name: 'Standard Microgrid Target',
        line: {
          dash: 'dashdot',
          width: 3,
          color: 'green'
        },
        showlegend: false
      };
    this.trace2 = {
      x: [1,2,3,4],
      y: [9,15,16,18],
      type: 'scatter',
      name: 'Standard Microgrid',
      line: {
        dash: 'solid',
        width: 3,
        color: 'green'
      }
    }
    this.trace3 = {
        x: [1, 2, 3, 4],
        y: [2, 8, 10, 14],
        type: 'scatter',
        name: 'Fenix Target',
        line: {
          dash: 'dashdot',
          width: 3,
          color: 'orange'
        },
        showlegend: false
      };
    let trace4 = {
      x: [1, 2, 3, 4],
      y: [1, 5, 11, 15],
      type: 'scatter',
      name: 'Fenix',
      line: {
        dash: 'solid',
        width: 3,
        color: 'orange'
      },
    }
    this.lineData = [this.trace1, this.trace2, this.trace3, trace4];
    this.lineLayout = {
      title: 'Number of Subscriptions (Targets Dashed)',
      xaxis: {
        title: 'Months'
      },
      yaxis: {
        title: 'Subscriptions'
      }
    }

    this.getEspData();
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
        window.onresize = function() {
          if(_this.tabIndex == 0){
            Plotly.Plots.resize(_this._myPlot);
          }
        };
      }
    }
  }

  onClick(e){
    console.log(e);
  }

  getEspData(){
    this.esps = [
      {
        name:'Fenix',
        targetTotal: 30000,
        currerntTotal: 10000,
        onPlot: true
      },
      {
        name:'Standard Microgrid',
        targetTotal: 25000,
        currerntTotal: 15000,
        onPlot: true
      },
      {
        name:'Mobisal',
        targetTotal: 15000,
        currerntTotal: 5000,
        onPlot: false
      },
      {
        name:'Angaza',
        targetTotal: 18000,
        currerntTotal: 10000,
        onPlot: false
      }
    ]
  }

  download(){
    console.log(this.tabIndex);
  }

  handleChange(e) {
    this.tabIndex = e.index;
    if(e.index == 0){
      Plotly.Plots.resize(this._myPlot);
    }
  }

}

export class CustomHTMLElement extends HTMLElement {
  constructor() {
    super();
  }
  on(event_type, cb) {
  }
}
