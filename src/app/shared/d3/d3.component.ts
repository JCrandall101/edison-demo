import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
import {AppService} from '../../app.service';
import {GeoData} from './geodata.obj';
import {Feature} from './feature.obj';

@Component({
  selector: 'app-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.css']//,
  //encapsulation: ViewEncapsulation.None
})
export class D3Component implements OnInit, OnChanges {
  //@ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  @Input() private name: string = "d3Chart";
  @Input() private pointCoords: [number[],number[]];
  @Output() provinceClicked = new EventEmitter<any>();
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  private chartId = "d3Chart";
  private svgId = "d3Svg"
  geoData:GeoData;

  constructor(private appService:AppService) { }

  ngOnInit() {
    this.appService.getZambiaProvinceJson().subscribe((data:any)=>{
      this.geoData = data
      this.createChart();
    },
    error=>console.log(error)
  );
  }

  ngOnChanges(){
    if(this.geoData){
      if (this.data) {
        this.updateChart();
      }
    }

  }

  createChart(){
    let _this = this;
    this.width = 600;
    this.height = 519;

    //Map projection
    let projection = d3.geoMercator()
        .scale(2789.8234820355233)
        .center([27.852535,-13.201583843404675]) //projection center
        .translate([this.width/2,this.height/2]) //translate to center the map in view

    //Generate paths based on projection
    let path = d3.geoPath()
        .projection(projection);

        // user color brewer 2
    let color = d3.scaleQuantize<string>()
                  //.domain([0,16.67,33.34,50,66.87,83.34,1])
                  .range(['#edf8e9', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#005a32']);

    //Adds the tooltip box
    let div = d3.select("#" + this.name)
               .select('div')
               .append("div")
               .attr("class", "tooltip")
               .style("opacity", 0)
               .style("left", 0)
               .style("top", 0);

    //Select the SVG
    let svg = d3.select("#" + this.name)
        .select('div')
        .append('svg')//d3.select("#" + this.svgId)
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("class", "chart-content")
        .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
        .attr('preserveAspectRatio', 'xMinYMin meet');

    var zoom = d3.zoom()
      .scaleExtent([1, 9])
      .on("zoom", move);

    svg.call(zoom);

    //Group for the map features
    let features = svg.append("g")
        .attr("class","features");

    let geodata:any = this.geoData;
    //this.appService.getJson().subscribe((data:any)=>geodata = data);

      //Set input domain for color scale
    color.domain([
            d3.min(this.data, function (d) { return +d.value; }),
            d3.max(this.data, function (d) { return +d.value; })
        ]);

    for (var i = 0; i < this.data.length; i++) {
          var dataState = this.data[i].name;
          var dataValue = +this.data[i].value;
          //Find the corresponding state inside the GeoJSON
          for (var j = 0; j < geodata.features.length; j++) {
              var jsonState = geodata.features[j].properties.CAPTION;
              if (dataState == jsonState) {
                  //Copy the data value into the GeoJSON
                  geodata.features[j].properties['amount'] = dataValue;
                  //Stop looking through the JSON
                  break;
              }
          }
      }

      var paths = svg.selectAll("path")
                   .data(geodata.features);

      paths.enter().append("path")
          .attr("d", path)
          .style("stroke", "black")
          .style("fill", function (d:Feature) {
               var value = d.properties['amount'];
               if (value) {
                   return color(value);
               } else {
                   return "#ccc";
               }
           })
          .on('mouseover', showToolTip)
          .on('mouseout', hideToolTip)
          .on("click",clicked);

      let points;
      if(this.pointCoords){
        points = this.pointCoords;
      }else
      {
        points = [];
      }

      svg.selectAll("circle")
    		.data(points).enter()
    		.append("circle")
    		.attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
    		.attr("cy", function (d) { return projection(d)[1]; })
    		.attr("r", "5px")
    		.attr("fill", "red")
        .attr("stroke", "white")
        .attr("stroke-width", "1px")

      svg.selectAll("text")
        .data(geodata.features)
        .enter()
        .append("svg:text")
        .text(function(d:Feature){
          return d.properties.CAPTION;
        })
        .attr("x",function(d:Feature){
          var b = <d3.GeoPermissibleObjects>d;
          if(d.properties['middle-x']){
            return path.centroid(b)[0] + d.properties['middle-x']
          }
          else{
            return path.centroid(b)[0];
          }

        })
        .attr("y",function(d:Feature){
          var b = <d3.GeoPermissibleObjects>d;
          if(d.properties['middle-y']){
            return path.centroid(b)[1] + d.properties['middle-y']
          }
          else{
            return path.centroid(b)[1];
          }
        })
        .attr("text-anchor","middle")
        .attr("font-size","8pt")
        .attr("fill",function(d:Feature){
          let max = d3.max(color.domain())
          let min = d3.min(color.domain())
          let checkVal = ((max - min) / 2) + min;
          return (parseInt(d.properties['amount']) > checkVal) ? 'white' : 'black';
        })
        .attr("cursor","pointer")
        .on('mouseover', showToolTip)
        .on('mouseout', hideToolTip)
        .on("click",clicked);

    function showToolTip(d:Feature){
      div.transition()
          .duration(200)
          .style("opacity", .9);
      div.html(d.properties.CAPTION + " : " + parseInt(d.properties['amount']));
    }

    function hideToolTip(d:Feature){
      div.transition()
          .duration(200)
          .style("opacity", .0);
    }

    function move() {
      paths.style("stroke-width", 1 / d3.event.transform.k + "px");
      paths.attr("transform", d3.event.transform); // updated for d3 v4
    }
    // Add optional onClick events for features here
    // d.properties contains the attributes (e.g. d.properties.name, d.properties.population)
    function clicked(d,i) {
      // console.log(d,i);
      _this.provinceClicked.emit({province: d});
    }
  }

  updateChart() {
    d3.select("#" + this.name).selectAll('div > *').remove();
    this.createChart();
  }
}
