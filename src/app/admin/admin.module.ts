import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {SharedModule} from '../shared/shared.module';

import {AdminRoutingModule} from './admin-routing.module';
import { DataManagementComponent } from './data-management/data-management.component';

@NgModule({
  imports: [
    CommonModule,AdminRoutingModule,SharedModule.forRoot()
  ],
  declarations: [AdminComponent, DataManagementComponent]
})
export class AdminModule { }
