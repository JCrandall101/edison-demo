import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import {AdminComponent} from './admin.component';
import {DataManagementComponent} from './data-management/data-management.component';
import {UserManagementComponent} from './user-management/user-management.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'data-management',
    component: DataManagementComponent
  },
  {
    path: 'user-management',
    component: UserManagementComponent
  }
];

@NgModule({
  imports:[
    RouterModule.forChild(
      appRoutes
    )
  ],
  exports:[
    RouterModule
  ],
  providers:[

  ]
})

export class AdminRoutingModule{
  constructor(){

  }
}
