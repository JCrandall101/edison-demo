import { Component, OnInit } from '@angular/core';
import {Router,Params,ActivatedRoute} from '@angular/router';
import {AppService} from '../../app.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-external-gender',
  templateUrl: './external-gender.component.html',
  styleUrls: ['./external-gender.component.css']
})
export class ExternalGenderComponent implements OnInit {
  donutData:any;
  rawData:any[];
  tableData:any[];
  private chartData: Array<any> =
  [
    {name: "Male", value: "0"},
    {name: "Female", value: "0"}
  ];

  selectedProvince=['Luapula','Northern','Eastern','Central','Lusaka','Copperbelt','Southern','Western','North Western'];
  selectedGenders=['Male','Female'];
  selectedTypes = ['SHS','ESS Microgrid','Microgrid'];
  selectedTiers = ['1','2','3','4','5','6'];
  tiers: any[];
  constructor(private router: Router, private appService:AppService) { }

  ngOnInit() {
    this.rawData = this.appService.getZambiaData();
    this.generateData();

    this.tiers = [
      {label:'1',value:'1'},
      {label:'2',value:'2'},
      {label:'3',value:'3'},
      {label:'4',value:'4'},
      {label:'5',value:'5'},
      {label:'6',value:'6'},
    ]
  }

  navigateExternalDashboardHome(){
    this.router.navigate(['bfgz-impact']);
  }

  generateData() {
    let _this = this
    let filterData = _.filter(this.rawData,function(row){
      return _.contains(_this.selectedProvince,row.province) && _.contains(_this.selectedTypes,row.type) && _.contains(_this.selectedTiers,row.tier);
    })
    this.tableData = filterData;
    console.log('filered',filterData);
    let data = _.countBy(_.pluck(filterData,'customerGender'),function(prvnc){
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
              backgroundColor: ["#2f8dd0","#ff99ff"],
              hoverBackgroundColor: ["#5DA5DA","#ffccff"]
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

  tiersMultiSelect(){
    let _this = this;
    let tierOptions: any[] = [];
    _.each(_this.selectedTiers,function(t){
      //console.log('Hi');
      tierOptions.push({label: t, value: t});
    })
    return tierOptions
  }
}
