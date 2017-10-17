import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.css']
})
export class DataManagementComponent implements OnInit {
  uploadTypes:SelectItem[];
  selectedType:string;

  constructor() { }

  ngOnInit() {
    this.uploadTypes = [
      {
        label:'Product Types',
        value:'products'
      },
      {
        label:'Microgrids',
        value:'microgrids'
      },
      {
        label:'Tiers',
        value:'tiers'
      },
      {
        label:'Product Tier Association',
        value:'product_tier_asstn'
      }
    ]
  }

  fileSelect(){
    console.log('File Select');
  }

}
