import { Component, OnInit, OnDestroy,OnChanges,SimpleChanges ,Input} from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee-model';
import { ActivatedRoute } from '@angular/router';
import { EmployeeListResolveServiceGuard } from '../employee/employee-list-resolve-service.guard';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  // MatPaginator Inputs
  length = 100;
  pageSize = 1;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  //change detection example
  firstname : string = "Sujit";
  companyName : string;
  profile : any={name:"sujit",age:27};
  employees: Employee[];
  viewempid: number;
  private _searchTxt: string;
  filteredEmployees: Employee[];
  deleteMessage: string = '';

  userisAuthenticated: boolean = false;
  authStatusListSub: Subscription;

  constructor(private _employeeService: EmployeeService, private _route: ActivatedRoute,
    private _resolveGuard: EmployeeListResolveServiceGuard,
    private _authService: AuthService
  ) {
    this.employees = this._route.snapshot.data['listofemployee'];
    this.filteredEmployees = this.employees;


  }

  ngOnInit() {

    setTimeout(() => {
      this.firstname = 'Angular';
     
    }, 4000);
 // subscribe getResult method of service 
this._employeeService.getResult().subscribe((data)=>{
     console.dir(data);
   });

    //this.viewempid = +this._route.snapshot.paramMap.get('id');

    //snapshot approach
    /*if(this._route.snapshot.queryParamMap.has('searchTxt')){
     this.SearchTerm =  this._route.snapshot.queryParamMap.get('searchTxt');
    }else{
     this.filteredEmployees = this.employees;
    }*/

    //observable approach
    /*this._employeeService.getEmployees().subscribe((employess) => {
      this.employees = employess;
      this._route.queryParamMap.subscribe((queryParam) => {
        if (queryParam.has('searchTxt')) {
          this.SearchTerm = queryParam.get('searchTxt');
        } else {
          this.filteredEmployees = this.employees;
        }
      })
    });*/

    // check user is authenticated or not
    this.authStatusListSub = this._authService.getAuthStatusListener().subscribe((isAuthenticated) => {
    
      this.userisAuthenticated = isAuthenticated;
    })

  }
  ngOnDestroy() {
    this.authStatusListSub.unsubscribe();
  }
  changeEmployeeName() {
    this.profile.age = 28;
    let obj = Object.assign({}, this.profile);
    obj.age = 28;
    this.profile =  obj.age;
    this.employees[0].fullname = "Rishabh Singh";
    //this will run for pure pipe as well because we are creating brand new employee here
    //this.filteredEmployees = Object.assign([],this.employees);
    //this will not work for pure pipe because object refrence is not changing 
    //and it will be considered as a impure change so this will work for impure pipe
    this.filteredEmployees = this.employees;
    this.filteredEmployees = this.searchEmoployeeByName(this._searchTxt);

  }
  set SearchTerm(value: string) {
    this._searchTxt = value;
    if (value !== '') {
      this.filteredEmployees = this.searchEmoployeeByName(value);
    } else {
      this.filteredEmployees = this.employees;
    }
  }
  get SearchTerm(): string {
    return this._searchTxt;
  }
  searchEmoployeeByName(searchstr: string) {
    return this.employees.filter((employee) => employee.fullname.toLocaleLowerCase().indexOf(searchstr.toLocaleLowerCase()) !== -1);
  }
  deleteUser(empId: number) {
    this._employeeService.deleteEmployee(empId).subscribe((response) => {
      if (response.success) {
        this.deleteMessage = "Employee deleted successfully";
      } else {
        this.deleteMessage = "Employee deletion failed";
      }
    }, (error) => {
      this.deleteMessage = "Something went wrong. Please try again later";
    })

    for (var i = 0; i < this.employees.length; i++) {
      if (this.employees[i].id === empId) {
        this.employees.splice(i, 1);
      }
    }
  }



 getServerData(pageEvent){
  console.log(pageEvent);
 }

}