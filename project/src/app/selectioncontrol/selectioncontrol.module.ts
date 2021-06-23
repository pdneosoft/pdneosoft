import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { SelectioncontrolRoutingModule } from './selectioncontrol-routing.module';
import { SelectioncontrolComponent } from './selectioncontrol.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [
    SelectioncontrolComponent,
    
  ],
  imports: [
    CommonModule,
    SelectioncontrolRoutingModule,
     MatCheckboxModule,
     MatCardModule,
     FormsModule,
     ReactiveFormsModule,MatRadioModule,
     MatDialogModule,
    MatButtonModule
  ]
})
export class SelectioncontrolModule { }
