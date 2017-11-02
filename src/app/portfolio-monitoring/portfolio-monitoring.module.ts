import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioMonitoringComponent } from './portfolio-monitoring.component';
import {SharedModule} from '../shared/shared.module';

import {PortfolioMonitoringRoutingModule} from './portfolio-monitoring-routing.module';

@NgModule({
  imports: [
    CommonModule,PortfolioMonitoringRoutingModule,SharedModule.forRoot()
  ],
  declarations: [PortfolioMonitoringComponent]
})
export class PortfolioMonitoringModule { }
