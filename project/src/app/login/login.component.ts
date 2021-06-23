import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../service/http.service';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInDetails: FormGroup;
  result: any;
  username: any;

  constructor(private router: Router, private httpService: HttpService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.logInForm()
  }
  logInForm() {
    this.signInDetails = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    this.httpService.loginUser(this.signInDetails.value).subscribe(data => {
      this.result = data
      if (this.result['auth'] == true) {
        this.toastr.success('Login sucessfully', '', {
          timeOut: 5000
        });
        this.router.navigate(['/admindashboard'])
        var decoded = jwt_decode(this.result['token']);
        this.username =decoded['userName']
        console.log("",this.username );
        localStorage.setItem('userName', this.username);
        localStorage.setItem('token', this.result['token']);
        localStorage.setItem('auth', this.result['auth']);
      }
      else {
        this.toastr.error('Invalid User', '', {
          timeOut: 5000
        });
      }
    })

  }

}
