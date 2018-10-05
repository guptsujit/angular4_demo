import { Injectable } from '@angular/core';
import { Employee } from '../models/employee-model';
import { Observable, of,forkJoin } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
      isactive: false,
      profileImage : null
    }, {
      id: 2,
      fullname: 'rishank singh',
      gender: 'male',
      email: 'rishank@chetu.com',
      phoneno: 888888888,
      copntactpreference: 'phone',
      dob: new Date('04/01/1990'),
      department: '2',
      isactive: false,
      profileImage : null
    }, {
      id: 3,
      fullname: 'simple bhatia',
      gender: 'female',
      email: 'simpleb@chetu.com',
      phoneno: 888888888,
      copntactpreference: 'email',
      dob: new Date('04/01/1990'),
      department: '4',
      isactive: false,
      profileImage : null
    }
  ];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'my-auth-token'
    })
  }
  allemployee: Employee[];

  backendURl: string = environment.apiURl;

  constructor(private _httpClient: HttpClient) {

   }

  getEmployees(): Observable<Employee[]> {
    let saveurl = this.backendURl + "db.php?action=get_emp";
    return this._httpClient.get<Employee[]>(saveurl, this.httpOptions);

  }
  save(employee: Employee): Observable<{ success: number }> {
    let saveurl = this.backendURl + "db.php?action=add_emp";
    return this._httpClient.post<{ success: number }>(saveurl, employee, this.httpOptions);
  }
  getEmployeeDetail(employeeid: number): Observable<Employee> {
    let url = this.backendURl + "db.php?action=get_emp_detail&id=" + employeeid;
    return this._httpClient.get<Employee>(url, this.httpOptions);
  }
  deleteEmployee(employeeid: number): Observable<{ success: number }> {
    let url = this.backendURl + "db.php?action=delete_emp&id=" + employeeid;
    return this._httpClient.delete<{ success: number }>(url, this.httpOptions);
  }

  //get post from node backend and display it on home component
  getPostDetail(): Observable<{ post: string, date: Date }> {
    let url = "http://localhost:3000/api/getpost";
    return this._httpClient.get<{ post: string, date: Date }>(url);
  }

  //Post data to node backend 
  savePostDetail(): Observable<{ message: string }> {
    let post = { post: "This is first post coming from angular", date: new Date() };
    let url = "http://localhost:3000/api/savepost";
    return this._httpClient.post<{ message: string}>(url,post,this.httpOptions);
  }

  //Executing multiple concurrent HTTP requests
   getResult(){
    let employeeid = 7;
    let empDetaillUrl = this.backendURl + "db.php?action=get_emp_detail&id=" + employeeid;
    let url1 = this._httpClient.get(empDetaillUrl, this.httpOptions);
    let url2 = this._httpClient.get(this.backendURl + "db.php?action=get_emp", this.httpOptions);


// example emmiting multiple data from observable over a period of time
    /*const simpleObservable = new Observable((observer) => {
      // observable execution
      observer.next("sujit1");
      observer.next("sujit2");
      observer.next("sujit3");
      observer.complete()
  })
  simpleObservable.subscribe((data)=>{
    console.log(data);
  })*/
  
    //return forkJoin([url1,url2]);
    //this will also work
    return forkJoin(url1,url2);;
   
  }
}
