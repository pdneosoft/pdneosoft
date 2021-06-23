import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmindashboardRoutingModule } from './admindashboard-routing.module';
import { AdmindashboardComponent } from './admindashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../service/http.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  declarations: [
    AdmindashboardComponent
  ],
  imports: [
    CommonModule,
    AdmindashboardRoutingModule,
    NgxDatatableModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
   NgxSpinnerModule,
  ToastrModule.forRoot(),
  MatSelectModule,
  MatSidenavModule,
  MatIconModule,
  MatCheckboxModule
  ],
  providers: [HttpService],
})
export class AdmindashboardModule { }
