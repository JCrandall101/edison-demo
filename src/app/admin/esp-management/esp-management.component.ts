import { Component, OnInit } from '@angular/core';
import { Esp } from '../../shared/class/esp.obj';
import * as _ from 'underscore';

import {ConfirmationService} from 'primeng/primeng';

@Component({
  selector: 'app-esp-management',
  templateUrl: './esp-management.component.html',
  styleUrls: ['./esp-management.component.css'],
  providers: [ConfirmationService]
})
export class EspManagementComponent implements OnInit {
  esps:Esp[];
  displayAdd:boolean = false;
  displayEdit:boolean = false;
  selectedEsp:Esp;
  newEsp:Esp={isActive:true};
  visible:boolean = true;

  constructor(private confirmationService:ConfirmationService) { }

  ngOnInit() {
    this.esps = [
      {
        espId:'sm123',
        espName:'Standard Microgrid',
        apiToken:'310ad-31k1jc-9asl34',
        essTarget:20000,
        vfmTarget:15000,
        isActive:true
      },
      {
        espId:'fnx321',
        espName:'Fenix',
        apiToken:'81kfs-1lk13d-lk13ld',
        essTarget:30000,
        vfmTarget:20000,
        isActive:true
      }
    ]
  }

  addEsp(){
    this.displayAdd = false;
    this.esps.push(this.newEsp);
    this.newEsp = {isActive:true};
    this.updateVisibility();
  }
  cancelEsp(){
    this.newEsp = {isActive:true};
    this.displayAdd = false;
  }
  displayAddEsp(){
    this.displayAdd = true;
  }

  editEsp(esp:Esp){
    console.log(esp);
    this.selectedEsp = esp;
    this.displayEdit = true;
  }

  deleteEsp(esp:Esp){
    this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
              if(_.contains(this.esps,esp)){
                let index: number = this.esps.indexOf(esp);
                this.esps.splice(index,1);
                this.updateVisibility();
              }
            },
            reject: () => {

            }
        });

    console.log(this.esps);
  }

  saveEsp(){
    this.displayEdit = false;
  }
  deactivateEsp(){
    this.selectedEsp.isActive = !this.selectedEsp.isActive;
    this.displayEdit = false;
  }

  //PrimeNG was having issue with Updating table content. Use this to refresh table
  updateVisibility(): void {
    this.visible = false;
    setTimeout(() => this.visible = true, 0);
  }
}
