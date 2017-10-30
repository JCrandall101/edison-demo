import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalDashboardComponent } from './external-dashboard.component';
import {SharedModule} from '../shared/shared.module';

import {ExternalDashboardRoutingModule} from './external-dashboard-routing.module';
import { ExternalConnectionsComponent } from './external-connections/external-connections.component';
import { ExternalGenderComponent } from './external-gender/external-gender.component';

@NgModule({
  imports: [
    CommonModule,ExternalDashboardRoutingModule,SharedModule.forRoot()
  ],
  declarations: [ExternalDashboardComponent, ExternalConnectionsComponent, ExternalGenderComponent]
})
export class ExternalDashboardModule { }
