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
  pointCoords:[number[],number[]];
  selectedProvince:string = "All";

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
  }

  generateData() {
    let _this = this
    let data = _.countBy(_.pluck(_this.rawData,'province'),function(prvnc){
      return prvnc;
    })

    _.each(this.chartData,function(val){
      val.value = data[val.name];
    })
  }

  provinceClicked(e){
    this.selectedProvince = e.province.properties.CAPTION;
  }
}
