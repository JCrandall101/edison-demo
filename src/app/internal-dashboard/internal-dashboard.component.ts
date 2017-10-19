import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {AppService} from '../app.service';
import {D3Component} from '../shared/d3/d3.component';
import * as _ from 'underscore';
import {MenuItem} from 'primeng/primeng';
//import {GMapModule} from 'primeng/components/gmap/gmap';

@Component({
  selector: 'app-internal-dashboard',
  templateUrl: './internal-dashboard.component.html',
  styleUrls: ['./internal-dashboard.component.css']
})
export class InternalDashboardComponent implements OnInit {
  items:MenuItem[];
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

  // gmapOptions: any;
  // gmapOverlays: any[];


  constructor(private appService:AppService) { }

  ngOnInit() {
    this.items = [
                    {
                      label: 'Risk',
                      //icon: 'fa-plus'
                      items: [
                        {
                          label: 'Risk Report 1'
                        },
                        {
                          label: 'Risk Report 2'
                        }
                      ]
                    },
                    {
                      label: 'Analysis'//,
                      //icon: 'fa-download'
                    },
                    {
                      label: 'Modeling',
                      //icon: 'fa-refresh'
                      items:[
                        {
                          label: 'Modeling 1'
                        },
                        {
                          label: 'Modeling 2'
                        }
                      ]
                    }
                ];
    this.rawData = this.appService.getZambiaData();
    this.generateData();
    // this.gmapOptions = {
    //     center: {lat: -13.1403507, lng: 27.8493049},
    //     //-13.1403507 27.8493049
    //     zoom: 12
    // };

    // this.gmapOverlays = [
    //     new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title:"Konyaalti"}),
    //     new google.maps.Marker({position: {lat: 36.883707, lng: 30.689216}, title:"Ataturk Park"}),
    //     new google.maps.Marker({position: {lat: 36.885233, lng: 30.702323}, title:"Oldtown"}),
    //     new google.maps.Polygon({paths: [
    //         {lat: 36.9177, lng: 30.7854},{lat: 36.8851, lng: 30.7802},{lat: 36.8829, lng: 30.8111},{lat: 36.9177, lng: 30.8159}
    //     ], strokeOpacity: 0.5, strokeWeight: 1,fillColor: '#1976D2', fillOpacity: 0.35
    //     }),
    //     new google.maps.Circle({center: {lat: 36.90707, lng: 30.56533}, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500}),
    //     new google.maps.Polyline({path: [{lat: 36.86149, lng: 30.63743},{lat: 36.86341, lng: 30.72463}], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2})
    // ];
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
