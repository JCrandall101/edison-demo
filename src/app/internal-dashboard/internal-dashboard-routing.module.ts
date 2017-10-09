import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import {InternalDashboardComponent} from './internal-dashboard.component';

const appRoutes: Routes = [
  {
    path: '',
    component: InternalDashboardComponent
  },
  {
    path: 'analytics',
    component: InternalDashboardComponent
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

export class InternalDashboardRoutingModule{
  constructor(){

  }
}
