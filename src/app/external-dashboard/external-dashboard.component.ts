import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router,Params,ActivatedRoute} from '@angular/router';
import {AppService} from '../app.service';
import {D3Component} from '../shared/d3/d3.component';
import * as _ from 'underscore';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'app-external-dashboard',
  templateUrl: './external-dashboard.component.html',
  styleUrls: ['./external-dashboard.component.css']
})
export class ExternalDashboardComponent implements OnInit {
  items:MenuItem[];
  donutData:any;
  donutOptions:any;
  pointCoords:[number[],number[]]=[
    [27.852535,-13.201583843404675],
    [29.852535,-10.201583843404675],
    [28.389943,-15.521512]
  ];

  @ViewChild('zambiaChart') private zambiaChart: D3Component;
  private chartData: Array<any> =
  [
    {name: "Copperbelt", value: "0"},
    {name: "Southern", value: "0"},
    {name: "Eastern", value: "0"},
    {name: "Northern", value: "0"},
    {name: "Luapula", value: "0"},
    {name: "North Western", value: "0"},
    {name: "Western", value: "0"},
    {name: "Lusaka", value: "0"},
    {name: "Central", value: "0"}
  ];
  private rawData:any[];
  mapOptions: any[] = [{label:'All',value:'All'}];
  slctdMapOption: 'All';
  selectedGenders=['Male','Female'];
  selectedTypes = ['SHS','ESS Microgrid','Microgrid'];
  selectedTiers = ['1','2','3','4','5','6'];
  pieDDOptions = [
    {
      label:'Province',
      value:'province'
    },
    {
      label:'Tier',
      value:'tier'
    }
  ];
  selectedDDOption = 'province';

  constructor(private appService:AppService, private router:Router) {

  }

  ngOnInit() {
    this.items = [
            {label: 'Energy Service Subscriptions', icon: 'fa-bar-chart'},
            {label: 'Households Connected', icon: 'fa-calendar'},//command: (click) => {this.router.navigate(['home']);}},
            {label: 'Beneficiaries', icon: 'fa-book'},
            {label: 'Financial Leverage of BGFZ', icon: 'fa-support'},
            {label: 'Tones of CO2 Mitigated', icon: 'fa-twitter'}
        ];

    this.rawData = this.appService.getZambiaData();
    console.log(this.rawData);

    this.generateData();

    this.donutOptions = {
      legend: {
            display: false
         },
         scales: {
           yAxes: [{
               display: true,
               ticks: {
                   suggestedMin: 0,
               }
           }]
       }
    }
  }

  generateData() {
    let _this = this
    let filterData = _.filter(this.rawData,function(row){
      return _.contains(_this.selectedGenders,row.customerGender) && _.contains(_this.selectedTypes,row.type) && _.contains(_this.selectedTiers,row.tier);
    })
    let data = _.countBy(_.pluck(filterData,'province'),function(prvnc){
      return prvnc;
    })

    _.each(this.chartData,function(val){
      val.value = data[val.name];
    })

    this.donutData = {
      labels: _.pluck(this.chartData,'name'),
      datasets: [
          {
              data: _.pluck(this.chartData,'value'),
              backgroundColor: ["#4D4D4D","#5DA5DA","#FAA43A","#60BD68","#F17CB0","#B2912F","#B276B2","#DECF3F","#F15854"],
              hoverBackgroundColor: ["#4D4D4D","#5DA5DA","#FAA43A","#60BD68","#F17CB0","#B2912F","#B276B2","#DECF3F","#F15854"]
          }]
      };
    }

  mapOptionChange(){

  }
  processCheckBoxs(e){
    this.generateData();
    this.zambiaChart.updateChart();
  }
  processTypeCheckBoxs(e){
    this.generateData();
    this.zambiaChart.updateChart();
  }

  processTierCheckBoxs(e){
    this.generateData();
    this.zambiaChart.updateChart();
  }

}
