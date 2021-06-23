import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddserverconfigComponent } from '../addserverconfig/addserverconfig.component'
const routes: Routes = [
  {
    path: '',
    component: AddserverconfigComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddserverconfigRoutingModule { }
