import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalDashboardComponent } from './internal-dashboard.component';
import {SharedModule} from '../shared/shared.module';

import { InternalDashboardRoutingModule } from './internal-dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,InternalDashboardRoutingModule,SharedModule.forRoot()
  ],
  declarations: [InternalDashboardComponent]
})
export class InternalDashboardModule { }
