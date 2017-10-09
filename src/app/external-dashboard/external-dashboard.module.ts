import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalDashboardComponent } from './external-dashboard.component';
import {SharedModule} from '../shared/shared.module';

import {ExternalDashboardRoutingModule} from './external-dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,ExternalDashboardRoutingModule,SharedModule.forRoot()
  ],
  declarations: [ExternalDashboardComponent]
})
export class ExternalDashboardModule { }
