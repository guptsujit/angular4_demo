import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee-model';
import { ActivatedRoute } from '@angular/router';
import { EmployeeListResolveServiceGuard } from '../employee/employee-list-resolve-service.guard';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  viewempid: number;
  private _searchTxt: string;
  filteredEmployees: Employee[];

  deleteMessage: string = '';
  constructor(private _employeeService: EmployeeService, private _route: ActivatedRoute, private _resolveGuard: EmployeeListResolveServiceGuard) {
    this.employees = this._route.snapshot.data['listofemployee'];
    this.filteredEmployees = this.employees;
  }

  ngOnInit() {
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


  }
  changeEmployeeName() {
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
}