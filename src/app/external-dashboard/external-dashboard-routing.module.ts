import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import {ExternalDashboardComponent} from './external-dashboard.component';
import { ExternalConnectionsComponent } from './external-connections/external-connections.component';
import { ExternalGenderComponent } from './external-gender/external-gender.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ExternalDashboardComponent
  },
  {
    path: 'bgfz-impact',
    component: ExternalDashboardComponent
  },
  {
    path: 'connections',
    component: ExternalConnectionsComponent
  },
  {
    path: 'gender',
    component: ExternalGenderComponent
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
