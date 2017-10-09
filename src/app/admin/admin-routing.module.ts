import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import {AdminComponent} from './admin.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'Admin',
    component: AdminComponent
  }//,
  // {
  //   path: 'Credit-Toolkit',
  //   loadChildren: 'app/credit-toolkit/credit-toolkit.module#CreditToolkitModule'
  // },
  // {
  //   path: 'Plotly-Demo',
  //   component: PlotlyDemoComponent
  // },
  // {
  //   path: 'cdp-home',
  //   component: CdpHomeComponent
  // },
  // {
  //   path: 'charts-demo',
  //   component: ChartsDemoComponent
  // }
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
