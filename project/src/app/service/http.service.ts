import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = 'http://localhost:7001/api';


  diaglogClosed = new BehaviorSubject(false);
  constructor(private http: HttpClient) { }


  // For login admin
  loginUser(data: any) {
    return this.http.post(`${this.url}/login`, data);
  }
  // to get cong
  getServerConfigurations() {
    return this.http.get(`${this.url}/getserverconfiguration`)
  }
  // to add configuration

  addServerConfiguration(data: any) {
    return this.http.post(`${this.url}/addserverconfiguration`, data);
  }
  // to update single value
  updateSingleValue(data) {
    return this.http.post(`${this.url}/updateRecords`, data)
  }
  // to upload file
  uploadFile(data) {
    return this.http.post(`${this.url}/uploadserverconfigFile`, data)
  }
  // to add user
  addUser(data) {
    return this.http.post(`${this.url}/userregister`, data)
  }
  // to get selection control
  selectionControlValue(data) {
    return this.http.post(`${this.url}/selectioncontrolvalue`, data)
  }
  // To get distinct value
  getUniqueValue(data){
    return this.http.post(`${this.url}/getuniquevalue`, data)
  }
  // to get slection control update value
  getUpdateColumns(){
    return this.http.get(`${this.url}/getselectioncontrolvalue`)
  }

  getModelNumber(data:any){
    return this.http.post(`${this.url}/modelcreation`,data)
  }
}

