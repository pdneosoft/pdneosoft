import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SelectioncontrolComponent} from '../selectioncontrol/selectioncontrol.component'

const routes: Routes = [
  {
    path:'',
    component:SelectioncontrolComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectioncontrolRoutingModule { }
