import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee-model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  viewempid: number;
  searchTxt: string;
  filteredEmployees:Employee[];
  filteredEmp:Employee;
  constructor(private _employeeService: EmployeeService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.viewempid = +this._route.snapshot.paramMap.get('id');
    this.employees = this._employeeService.getEmployees();
    this.filteredEmployees = this.employees;

  }
  changeEmployeeName() {
    this.employees[0].fullname = "Rishabh Singh";
    //this will run for pure pipe as well because we are creating brand new employee here
    //this.filteredEmployees = Object.assign([],this.employees);
    //this will not work for pure pipe because object refrence is not changing 
    //and it will be considered as a impure change so this will work for impure pipe
    this.filteredEmployees = this.employees;

  }

}
