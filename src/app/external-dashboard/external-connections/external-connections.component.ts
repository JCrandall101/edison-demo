import { Component, OnInit } from '@angular/core';
import {Router,Params,ActivatedRoute} from '@angular/router';
import {AppService} from '../../app.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-external-connections',
  templateUrl: './external-connections.component.html',
  styleUrls: ['./external-connections.component.css'],
})
export class ExternalConnectionsComponent implements OnInit {
  donutData:any;
  rawData:any[];
  tableData:any[];
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

  selectedGenders=['Male','Female'];
  selectedTypes = ['SHS','ESS Microgrid','Microgrid'];
  selectedTiers = ['1','2','3','4','5','6'];
  constructor(private router: Router, private appService:AppService) { }

  ngOnInit() {
    this.rawData = this.appService.getZambiaData();
    this.generateData();
  }

  navigateExternalDashboardHome(){
    this.router.navigate(['bfgz-impact']);
  }

  generateData() {
    let _this = this
    let filterData = _.filter(this.rawData,function(row){
      return _.contains(_this.selectedGenders,row.customerGender) && _.contains(_this.selectedTypes,row.type) && _.contains(_this.selectedTiers,row.tier);
    })
    this.tableData = filterData;
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

  processCheckBoxs(e){
    this.generateData();
  }
  processTypeCheckBoxs(e){
    this.generateData();
  }

  processTierCheckBoxs(e){
    this.generateData();
  }
}
