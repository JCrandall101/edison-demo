import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import {ExternalDashboardComponent} from './external-dashboard.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ExternalDashboardComponent
  },
  {
    path: 'bgfz-impact',
    component: ExternalDashboardComponent
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

export class ExternalDashboardRoutingModule{
  constructor(){

  }
}
