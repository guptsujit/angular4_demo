import { Injectable } from '@angular/core';
import { Employee } from '../models/employee-model';
import { Observable,of} from 'rxjs';
import {delay,catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  epmloyees: Employee[] = [
    {
      id: 1,
      fullname: 'sujit gupta',
      gender: 'male',
      email: 'sujitk2@chetu.com',
      phoneno: 9752883424,
      copntactpreference: 'email',
      dob: new Date('04/01/1991'),
      department: '2',
      isactive: false
    }, {
      id: 2,
      fullname: 'rishank singh',
      gender: 'male',
      email: 'rishank@chetu.com',
      phoneno: 888888888,
      copntactpreference: 'phone',
      dob: new Date('04/01/1990'),
      department: '2',
      isactive: false
    }, {
      id: 3,
      fullname: 'simple bhatia',
      gender: 'female',
      email: 'simpleb@chetu.com',
      phoneno: 888888888,
      copntactpreference: 'email',
      dob: new Date('04/01/1990'),
      department: '4',
      isactive: false
    }
  ];
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      //'Authorization': 'my-auth-token'
    })
  }
  allemployee:Employee[];
  constructor(private _httpClient:HttpClient) { }

  getEmployees(): Observable<Employee[]>{
    let saveurl = "http://localhost/emp_api/db.php?action=get_emp";
    return this._httpClient.get<Employee[]>(saveurl,this.httpOptions);
 
  }
  save(employee: Employee): Observable<any> {
    let saveurl = "http://localhost/emp_api/db.php?action=add_emp";
    return this._httpClient.post(saveurl,employee,this.httpOptions);
  }
  getEmployeeDetail(employeeid: number): Observable<Employee> {
    let url = "http://localhost/emp_api/db.php?action=get_emp_detail&id="+employeeid;
    return this._httpClient.get<Employee>(url,this.httpOptions);
  }
  deleteEmployee(employeeid: number):Observable<{success:1|0}>{
    let url = "http://localhost/emp_api/db.php?action=delete_emp&id="+employeeid;
    return this._httpClient.delete<{success:1|0}>(url,this.httpOptions);
  }
}
