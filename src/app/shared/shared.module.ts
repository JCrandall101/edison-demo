import {NgModule,ModuleWithProviders} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import 'rxjs/add/operator/toPromise';
import {D3Component} from './d3/d3.component';
import {CheckboxModule} from 'primeng/primeng';
import {DataTableModule} from 'primeng/components/datatable/datatable';
import {ButtonModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
//import {MessagingService} from './services/messaging.service';

@NgModule({
  imports: [CommonModule,CheckboxModule,FormsModule,DataTableModule,ButtonModule,DialogModule],
  declarations: [D3Component],
  exports: [CommonModule,D3Component,CheckboxModule,FormsModule,DataTableModule,ButtonModule,DialogModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
      return{
        ngModule: SharedModule,
        providers: []
      }
    }
  }
