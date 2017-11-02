import { Component,OnInit, OnChanges, AfterViewChecked } from '@angular/core';
import {Router,Params,ActivatedRoute} from '@angular/router';

import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {MenuItem} from 'primeng/components/common/api'
import { AuthService } from './auth.service';

import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges, AfterViewChecked {
  title = 'EDISON';

  msgs:Message[];
  items: MenuItem[];
  portfolioMonitoring: MenuItem = {
    label: 'Portfolio Monitoring',
    icon: 'fa fa-line-chart',
    command: (click) => {this.router.navigate(['portfolio-monitoring']);}
  }
  internalDashItem: MenuItem = {
    label: 'Risk Anlysis',
    icon: 'fa fa-bar-chart',
    command: (click) => {this.router.navigate(['analytics']);}
  };
  adminItem: MenuItem = {
    label: 'Admin',
    icon: 'fa-database',
    items:[
      {
        label: 'User Management',
        command: (click) => {this.router.navigate(['admin/user-management']);}
      },
      {
        label: 'ESP Management',
        command: (click) => {this.router.navigate(['admin/esp-management'])}
      },
      {
        label: 'Data Management',
        command: (click) => {this.router.navigate(['admin/data-management']);}
      }
    ]
  };

  constructor(private route: ActivatedRoute,private router:Router,private messageService: MessageService,private authService:AuthService){}

  ngOnInit() {
    this.items = [
      {
        label: 'BGFZ Impact',
        icon: 'fa fa-gears',
        command: (click) => {this.router.navigate(['bfgz-impact']);}
      },
      {
        label: 'Info',
        icon: 'fa fa-info-circle',
        command: (click) => {this.router.navigate(['info']);}
      }
    ];
  }

  ngOnChanges(){
  }

  ngAfterViewChecked(){
    if(this.authService.isLoggedIn){
      if(!_.contains(this.items,this.adminItem)){
        this.items.splice(1,0,this.adminItem);
      }
      if(!_.contains(this.items,this.internalDashItem)){
        this.items.splice(1,0,this.internalDashItem);
      }
      if(!_.contains(this.items,this.portfolioMonitoring)){
        this.items.splice(1,0,this.portfolioMonitoring);
      }
    }

    if(!this.authService.isLoggedIn){
      if(_.contains(this.items,this.portfolioMonitoring)){
        let index: number = this.items.indexOf(this.portfolioMonitoring);
        this.items.splice(index,1);
      }
      if(_.contains(this.items,this.adminItem)){
        let index: number = this.items.indexOf(this.adminItem);
        this.items.splice(index,1);
      }
      if(_.contains(this.items,this.internalDashItem)){
        let index: number = this.items.indexOf(this.internalDashItem);
        this.items.splice(index,1);
      }
    }
  }

  showViaService() {
      this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }
  login(){
    if(this.router.url!='/login'){
      this.authService.redirectUrl = this.router.url;
    }
    this.router.navigate(['/login']);
  }
  logout(){
    this.authService.logout();
    if(!this.authService.isLoggedIn){
      if(_.contains(this.items,this.portfolioMonitoring)){
        let index: number = this.items.indexOf(this.portfolioMonitoring);
        this.items.splice(index,1);
      }
      if(_.contains(this.items,this.adminItem)){
        let index: number = this.items.indexOf(this.adminItem);
        this.items.splice(index,1);
      }
      if(_.contains(this.items,this.internalDashItem)){
        let index: number = this.items.indexOf(this.internalDashItem);
        this.items.splice(index,1);
      }
    }
    console.log('logout');
    this.router.navigate(['/bfgz-impact']);
  }

  cookieCheck(){
    if(typeof(Storage) !== "undefined"){
      if (sessionStorage.clickcount) {
                    sessionStorage.clickcount = Number(sessionStorage.clickcount)+1;
                } else {
                    sessionStorage.clickcount = 1;
                }
                document.getElementById("result").innerHTML = "You have clicked the button " + sessionStorage.clickcount + " time(s) in this session.";
            } else {
                document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }
}
