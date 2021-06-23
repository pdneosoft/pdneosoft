import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  price: number;
  ram: any=0;
  opertingSystem: any=0;
  zgroup: any=0;
  osCount: any=0;
  ramCount: number=0;
  osOnRaidValue: any='pranjali';
  numberofDrivesValue: any=5

  constructor(private formBuilder: FormBuilder) { }
  osdetails= this.formBuilder.group({
    os:new FormControl('', [Validators.required]),
    Z:new FormControl('', [Validators.required]),
    OSonRAID:new FormControl('0', [Validators.required]),
    numberofDrives:new FormControl('R', [Validators.required])
      // email: new FormControl('', [Validators.required, Validators.email]),
  })
  ngOnInit(): void {
  }

  valueChange()
  { 
    console.log("....",this.osdetails);
    
  }
  changeOs(e) {
    console.log("osdetails",this.osdetails.value);
    
this.zgroup=this.osdetails.value.Z.slice(1)
// if(this.zgroup!='')
// {
//   this.opertingSystem=1;
//   this.numberofDrives=1;
//   this.osOnRaid=0
// }
this.opertingSystem=this.osdetails.value.os
this.numberofDrivesValue=this.osdetails.value.numberofDrives
this.osOnRaidValue=this.osdetails.value.OSonRAID

console.log("",this.zgroup,this.osCount,this.ramCount,this.osOnRaidValue,this.numberofDrivesValue)
    // console.log(e.target.value);
if(e.target.value==='osUbuntu')
{
this.price=10;
this.osCount=0
}
else if(e.target.value==='osWin')
{
  this.price=20;
  this.osCount=1
}
else if(e.target.value==='osWindows')
{
  this.price=30;
  this.osCount=2
}
else if(e.target.value==='16GBECCDDR42400')
{
  this.ram='16GBECCDDR42400';
  this.ramCount=1
}
else if(e.target.value==='16GBECCDDR42400')
{
  this.ram='16GBECCDDR42400';
  this.ramCount=2
}
else if(e.target.value==='64GBECCDDR42400')
{
  this.ram='64GBECCDDR42400';
  this.ramCount=3
}


  }


}
