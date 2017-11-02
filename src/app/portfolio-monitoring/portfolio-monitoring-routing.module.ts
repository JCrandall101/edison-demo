import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import {PortfolioMonitoringComponent} from './portfolio-monitoring.component';

const routes: Routes = [
  {
    path: '',
    component: PortfolioMonitoringComponent
  },
  {
    path: 'portfolio-monitoring',
    component: PortfolioMonitoringComponent
  }
];

@NgModule({
  imports:[
    RouterModule.forChild(
      routes
    )
  ],
  exports:[
    RouterModule
  ],
  providers:[

  ]
})

export class PortfolioMonitoringRoutingModule{
  constructor(){

  }
}
