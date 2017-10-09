import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import {MenubarModule} from 'primeng/components/menubar/menubar';
import {GrowlModule} from 'primeng/primeng';
import {MessageService} from 'primeng/components/common/messageservice';
import {ButtonModule} from 'primeng/primeng';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import {DataTableModule} from 'primeng/components/datatable/datatable';
import {ChartModule} from 'primeng/primeng';


import { HomeComponent } from './home/home.component';
//import { D3Component } from './d3/d3.component';
import {SharedModule} from './shared/shared.module';
import { AppService } from './app.service';
import { LoginComponent } from './login.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, LoginComponent
  ],
  imports: [
    BrowserModule,HttpModule,BrowserAnimationsModule,AppRoutingModule,MenubarModule,GrowlModule,ButtonModule,DropdownModule,DataTableModule,ChartModule,
    SharedModule.forRoot()
  ],
  providers: [MessageService,AppService,AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
