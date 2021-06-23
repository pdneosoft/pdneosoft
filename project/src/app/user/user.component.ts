import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  adduser = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    // storagerange:new FormControl('',[Validators.required]),
  })
  result: Object;
  dialogClose: boolean = false
  constructor(private httpService: HttpService, private toastr: ToastrService, public dialog: MatDialog) { }
  rolelist: any = ['User', 'Admin']
  ngOnInit(): void {
  }
  addUser() {
    if (this.adduser.invalid) {
      this.toastr.error('Please fill all field', '', {
        timeOut: 5000
      });
    }
    else {
      this.httpService.addUser(this.adduser.value).subscribe(data => {
        this.result = data
        if (this.result) {
          this.toastr.success('User Added ', 'Successfully!', {
            timeOut: 5000
          });
        }

      })
    }
    // this.httpService.diaglogClosed.next(true)
    // console.log(this.dialogClose,this.adduser.invalid)
  }

}
