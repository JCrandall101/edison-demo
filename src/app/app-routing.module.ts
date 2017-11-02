import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ExternalDashboardModule} from './external-dashboard/external-dashboard.module';
import {InternalDashboardModule} from './internal-dashboard/internal-dashboard.module';
import {PortfolioMonitoringModule} from './portfolio-monitoring/portfolio-monitoring.module';
import {AdminModule} from './admin/admin.module';
import { AuthGuard } from './auth.guard';
import {LoginComponent} from './login.component';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/external-dashboard/external-dashboard.module#ExternalDashboardModule'
  },
  {
    path: 'info',
    component: HomeComponent
  },
  {
     path: 'bfgz-impact',
     loadChildren: 'app/external-dashboard/external-dashboard.module#ExternalDashboardModule'
  },
  {
    path: 'portfolio-monitoring',
    canActivate: [AuthGuard],
    loadChildren: 'app/portfolio-monitoring/portfolio-monitoring.module#PortfolioMonitoringModule'
  },
  {
     path: 'analytics',
     canActivate: [AuthGuard],
     loadChildren: 'app/internal-dashboard/internal-dashboard.module#InternalDashboardModule'
  },
  {
     path: 'admin',
     canActivate: [AuthGuard],
     loadChildren: 'app/admin/admin.module#AdminModule'
  },
  {
    path: 'login',
    component: LoginComponent
  }
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
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports:[
    RouterModule
  ],
  providers:[

  ]
})

export class AppRoutingModule{
  constructor(){

  }
}
