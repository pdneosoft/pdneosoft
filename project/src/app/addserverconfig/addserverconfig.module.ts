import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { AddserverconfigRoutingModule } from './addserverconfig-routing.module';
import { AddserverconfigComponent } from './addserverconfig.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
// import {      
//   MatButtonModule,      
//   MatMenuModule,      
//   MatToolbarModule,      
//   MatIconModule,      
  // MatCardModule     
//   MatFormFieldModule,      
//   MatInputModule,      
//   MatDatepickerModule,      
//   MatDatepicker,      
//   MatNativeDateModule,      
//   MatRadioModule,      
//   MatSelectModule,      
//   MatOptionModule,      
//   MatSlideToggleModule,ErrorStateMatcher,ShowOnDirtyErrorStateMatcher      
// } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AddserverconfigComponent
  ],
  imports: [
    CommonModule,
    AddserverconfigRoutingModule,
    MatInputModule,
    FormsModule,      
    ReactiveFormsModule,      
    MatDialogModule,
    MatCardModule,      
    // BrowserAnimationsModule,      
    MatButtonModule,
    MatSelectModule
  ]
})
export class AddserverconfigModule { }
