import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {SharedModule} from '../shared/shared.module';

import {AdminRoutingModule} from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,AdminRoutingModule,SharedModule.forRoot()
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
