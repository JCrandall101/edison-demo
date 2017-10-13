import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AppService} from '../app.service';
import {D3Component} from '../shared/d3/d3.component';
import * as _ from 'underscore';

@Component({
  selector: 'app-external-dashboard',
  templateUrl: './external-dashboard.component.html',
  styleUrls: ['./external-dashboard.component.css']
})
export class ExternalDashboardComponent implements OnInit {
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

  constructor(private appService:AppService) { }

  ngOnInit() {
    this.rawData = this.appService.getZambiaData();

    this.generateData();
  }

  generateData() {
    let _this = this
    let filterData = _.filter(this.rawData,function(row){
      return _.contains(_this.selectedGenders,row.customerGender) && _.contains(_this.selectedTypes,row.type);
    })
    let data = _.countBy(_.pluck(filterData,'province'),function(prvnc){
      return prvnc;
    })

    _.each(this.chartData,function(val){
      val.value = data[val.name];
    })
    //console.log(this.chartData);
    // this.chartData = [];
    // _.each(data,function(val,key){
    //   _this.chartData.push({name:key.toString(), value:val.toString()});
    // });
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

}