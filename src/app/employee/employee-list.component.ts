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
  viewempid :number;
  constructor(private _employeeService: EmployeeService,private _route:ActivatedRoute) { }

  ngOnInit() {
    this.viewempid = +this._route.snapshot.paramMap.get('id');
    this.employees = this._employeeService.getEmployees();
   
  }

}
