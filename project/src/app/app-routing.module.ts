import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuard} from './service/auth.guard'

const routes: Routes = [
  {
    path: 'dashboard',
   
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule),
    canActivate:[AuthGuard]
  },
  {
    path:'',
    loadChildren: () => import('./login/login.module').then(m=>m.LoginModule),
     pathMatch: 'full',
  },
  {
    path:'admindashboard',
    loadChildren: () => import('./admindashboard/admindashboard.module').then(m=>m.AdmindashboardModule),
    pathMatch: 'full',
    canActivate:[AuthGuard]
  },
  {
    path:'addserverconfiguration',
    loadChildren: () => import('./addserverconfig/addserverconfig.module').then(m=>m.AddserverconfigModule)
  },
  {
    path:'createuser',
    loadChildren: () => import('./user/user.module').then(m=>m.UserModule)
  },

  {path: '**', loadChildren: () => import('./login/login.module').then(m=>m.LoginModule)},
  {
   path:'selectioncontrol' ,
   loadChildren: () => import('./selectioncontrol/selectioncontrol.module').then(m=>m.SelectioncontrolModule)
  }
  // { path: '', component: AppComponent }

];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
   imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
