import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {SharedModule} from '../shared/shared.module';

import {AdminRoutingModule} from './admin-routing.module';
import { DataManagementComponent } from './data-management/data-management.component';
import { UserManagementComponent } from './user-management/user-management.component';

import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import { EspManagementComponent } from './esp-management/esp-management.component';

@NgModule({
  imports: [
    CommonModule,AdminRoutingModule,SharedModule.forRoot(),ConfirmDialogModule
  ],
  declarations: [AdminComponent, DataManagementComponent, UserManagementComponent, EspManagementComponent],
  providers: [ConfirmationService]
})
export class AdminModule { }
