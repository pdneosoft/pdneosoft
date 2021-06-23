import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpService } from '../service/http.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-selectioncontrol',
  templateUrl: './selectioncontrol.component.html',
  styleUrls: ['./selectioncontrol.component.css'],
})
export class SelectioncontrolComponent implements OnInit {
  selectedSelector: any = '';
  form: FormGroup;
  seShadow: { name: string; checked: boolean; value: string }[];
  responseArray: any = [];
  data: string;
  selctionControlArray: any = [];
  result: Object;
  resultData: any = [];
  resultDataSend: any = [];
  allInOneKeys: any;
  updatedColumns: any;
  columnsValue: void;
  shadowColumns: any = [];
  appMachinesColumns: any = [];
  shadowColumnsUpdate: any;
  clientAppUpdate: any;
  columnsValueShadow: any;
  updatedata: any;
  constructor(
    private fb: FormBuilder,
    private httpservice: HttpService,
    private toastr: ToastrService
  ) {}

  // (3) ["cameras", "max_data_rate", "storage_range"]
  selectorShadow = [
    { name: 'Cameras', checked: true, value: 'cameras' },
    { name: 'Max Data Rate', checked: true, value: 'max_data_rate' },
    { name: 'Storage Range', checked: true, value: 'storage_range' },
    { name: 'OS', checked: true, value: 'os_type' },
    { name: 'Form factor', checked: true, value: 'form_factor' },
    { name: 'HDD Slots - Data Drives', checked: true, value: 'hdd_slots' },
    { name: 'Storage Type', checked: true, value: 'storage_type' },
    { name: 'Display Rate', checked: false, value: 'display_rate' },
    { name: 'Monitors Supported', checked: false, value: 'monitors_supported' },
    {
      name: 'Dual Redundant Power Supply',
      checked: false,
      value: 'power_supply',
    },
    { name: 'OS on RAID', checked: false, value: 'os_on_raid' },
    { name: 'Category', checked: false, value: 'category' },
    { name: 'CPU', checked: false, value: 'cpu' },
    { name: 'RAM', checked: false, value: 'ram' },
  ];

  ngOnInit(): void {
    this.getUniqueValue();
    this.seShadow = this.selectorShadow;
    // build reactive form skeleton
    this.form = new FormGroup({
      selector: new FormControl('Shadow', Validators.required),
      seShadow: new FormArray([]),
    });
    // this.changeSelector('Shadow')

    // this.setSelectorValue();
  }

  // bind existing value to form control
  setSelectorValue() {
    // get array control
    // this.getUniqueValue();
    const formArray = this.form.get('seShadow') as FormArray;
    // loop each existing value
    this.seShadow.forEach((se) => {
      formArray.push(
        new FormGroup({
          name: new FormControl(se.name),
          checked: new FormControl(se.checked),
          value: new FormControl(se.value),
        })
      );
    });
  }
  // on add button
  submitForm() {
    var value = this.form.value;
    const selectedSelector = this.form.value.seShadow.filter((f) => f.checked);
    this.selctionControlArray.push({ seShadow: selectedSelector });
    this.selctionControlArray.push({ selector: this.form.value.selector });
    this.httpservice
      .getUniqueValue(this.selctionControlArray)
      .subscribe((response) => {
        //  this.resultData=response;

        if (response['status'] == 200) {
          this.resultData.push({ seShadow: response['data'] });
          const updated = this.resultData[0].seShadow.map((ele) => {
            return {
              [Object.keys(ele)[0]]: ele[Object.keys(ele)[0]].split(','),
            };
          });
          this.resultDataSend.push({ seShadow: updated });
          this.resultDataSend.push({ selector: this.form.value.selector });
          this.httpservice
            .selectionControlValue(this.resultDataSend)
            .subscribe((result) => {});
        }
      });
  }
  
  getUniqueValue() {
    this.httpservice.getUpdateColumns().subscribe((data) => {
      this.updatedata = data;

      // if data is not added
      if (Object.keys(this.updatedata).length == 0) {
        this.updatedColumns = [];
        this.shadowColumnsUpdate = [];
        this.clientAppUpdate = [];

        this.selectorShadow.forEach((element) => {
          let result = this.shadowColumnsUpdate.includes(element.value);

          if (result) {
            element.checked = true;
          } else {
            element.checked = false;
          }
        });
        this.seShadow = this.selectorShadow;

        this.setSelectorValue();
      } else {
        if (data['data']['All_in_One'] != null) {
          this.allInOneKeys = Object.values(data['data']['All_in_One']);
          this.updatedColumns = this.allInOneKeys.map((ele) => {
            return [Object.keys(ele)[0]].toString();
          });
        }
        if (data['data']['All_in_One'] == null) {
          this.updatedColumns = [];
        }
        if (data['data']['Shadow'] != null) {
          this.shadowColumns = Object.values(data['data']['Shadow']);

          this.shadowColumnsUpdate = this.shadowColumns.map((ele: any) => {
            return [Object.keys(ele)[0]].toString();
          });

          this.selectorShadow.forEach((element) => {
            let result = this.shadowColumnsUpdate.includes(element.value);

            if (result) {
              element.checked = true;
            } else {
              element.checked = false;
            }
          });
          this.seShadow = this.selectorShadow;

          this.setSelectorValue();
        }
        if (data['data']['Shadow'] == null) {
          this.shadowColumnsUpdate = [];

          this.selectorShadow.forEach((element) => {
            let result = this.shadowColumnsUpdate.includes(element.value);

            if (result) {
              element.checked = true;
            } else {
              element.checked = false;
            }
          });
          this.seShadow = this.selectorShadow;

          this.setSelectorValue();
        }
        // this.setSelectorValue();
        if (data['data']['Client_App_Machines'] != null) {
          this.appMachinesColumns = Object.values(
            data['data']['Client_App_Machines']
          );

          this.clientAppUpdate = this.appMachinesColumns.map((ele) => {
            return [Object.keys(ele)[0]].toString();
          });
        }
        if (data['data']['Client_App_Machines'] == null) {
          this.clientAppUpdate = [];
        }
      }
    });
  }
  changeSelector(e) {
    if (e.target.value == 'Shadow') {
      this.columnsValueShadow = this.selectorShadow.forEach((element) => {
        let result = this.shadowColumnsUpdate.includes(element.value);

        if (result) {
          return (element.checked = true);
        } else {
          element.checked = false;
        }
      });
      this.seShadow = this.selectorShadow;

      // this.form.removeControl('seShadow');
      this.form = new FormGroup({
        selector: new FormControl('Shadow', Validators.required),
        seShadow: new FormArray([]),
      });
      this.setSelectorValue();
    }
    if (e.target.value == 'All-in-One') {
      // this.shadowColumnsUpdate = this.shadowColumns.map((ele) => { return [Object.keys(ele)[0]].toString() })
      if (Object.keys(this.updatedata).length != 0) {
        this.columnsValue = this.selectorShadow.forEach((element) => {
          let result = this.updatedColumns.includes(element.value);

          if (result) {
            element.checked = true;
          } else {
            element.checked = false;
          }
        });
      }
      if (Object.keys(this.updatedata).length == 0) {
        this.columnsValue = this.selectorShadow.forEach((element) => {
          this.updatedColumns = [];
          let result = this.updatedColumns.includes(element.value);

          if (result) {
            element.checked = true;
          } else {
            element.checked = false;
          }
        });
      }
      this.seShadow = this.selectorShadow;

      this.form = new FormGroup({
        selector: new FormControl('All-in-One', Validators.required),
        seShadow: new FormArray([]),
      });
      // this.changevalue()
      this.setSelectorValue();
    }
    // this.form.removeControl('seShadow')
    if (e.target.value == 'Client /App Machines') {
      this.seShadow = this.selectorShadow;
      //  this.shadowColumnsUpdate=this.shadowColumns.map((ele) => { return  [Object.keys(ele)[0]].toString()  })
      //  this.appMachinesColumns = Object.values(data['data']['Client_App_Machines']);

      this.clientAppUpdate = this.appMachinesColumns.map((ele) => {
        return [Object.keys(ele)[0]].toString();
      });
      if (this.appMachinesColumns != 0) {
        this.selectorShadow.forEach((element) => {
          let result = this.clientAppUpdate.includes(element.value);
          if (result) {
            element.checked = true;
          } else {
            element.checked = false;
          }
        });
      }
      if (this.appMachinesColumns == 0) {
        this.clientAppUpdate = [];
        this.selectorShadow.forEach((element) => {
          let result = this.clientAppUpdate.includes(element.value);
          if (result) {
            element.checked = true;
          } else {
            element.checked = false;
          }
        });
      }

      this.form = new FormGroup({
        selector: new FormControl('Client /App Machines', Validators.required),
        seShadow: new FormArray([]),
      });
      // this.changevalue()
      this.setSelectorValue();
    }
  }
}
