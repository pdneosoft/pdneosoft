import { Component, Input, Inject } from "@angular/core";
import { OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
// import { HttpService } from '../service/http.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { HttpService } from "../service/http.service";

@Component({
  selector: 'app-addserverconfig',
  templateUrl: './addserverconfig.component.html',
  styleUrls: ['./addserverconfig.component.css']
})
export class AddserverconfigComponent implements OnInit {
  submitted: boolean;

  constructor(private router: Router, private httpService: HttpService, private toastr: ToastrService) { }
  selctorlists=['Shadow','All-in-One','Client /App Machines']

  addserverconfig = new FormGroup({
    // selector:new FormControl('', [Validators.required]),
    cameras: new FormControl('', [Validators.required]),
    maxdatarate: new FormControl('', [Validators.required]),
    displayrate: new FormControl('', [Validators.required]),
    storagerange: new FormControl('', [Validators.required]),
    system: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    category: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    ff: new FormControl('', [Validators.required]),
    hddslots: new FormControl('', [Validators.required]),
    availablestorage: new FormControl('', [Validators.required]),
    installedHDDs: new FormControl('', [Validators.required]),
    storagetype: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    HDDsize: new FormControl('', [Validators.required]),
    cpu: new FormControl('', [Validators.required]),
    RAM: new FormControl('', [Validators.required]),
    videotype: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    monitorssupported: new FormControl('', [Validators.required]),
    ostype: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    osonRAID: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    systemType: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    NICs: new FormControl('', [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    powersupply: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    model: new FormControl('', [Validators.required]),
    option: new FormControl('', [Validators.required]),
    product_code: new FormControl('', [Validators.required]),
    viconreplacement: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    viconmodel: new FormControl('', [Validators.required]),

  })
    // convenience getter for easy access to form fields
    get f() {
      // console.log("...",this.addserverconfig.controls)
       return this.addserverconfig.controls;
      
       }
  ngOnInit(): void {
  }
  addconfiguration() {
    this.submitted = true;
    this.httpService.addServerConfiguration(this.addserverconfig.value).subscribe((result) => {
      if (result['status'] == 200) {
        this.toastr.success('Record Added ', 'Successfully!', {
          timeOut: 5000
        });
      }
    })
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
