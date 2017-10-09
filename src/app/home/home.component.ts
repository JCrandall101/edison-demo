import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AppService} from '../app.service';
// import {D3Component} from '../shared/d3/d3.component';
// import * as _ from 'underscore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private appService:AppService) { }

  ngOnInit() {

  }


}
