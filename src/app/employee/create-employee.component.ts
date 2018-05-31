import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department-model';
import { Employee } from '../models/employee-model';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm')
  public CreateEmployeeForm: NgForm;
  department: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 4, name: 'IT' },
    { id: 3, name: 'Payroll' }
  ];

  empmodel: Employee = {
    id: null,
    fullname: '',
    gender: '',
    email: '',
    phoneno: null,
    copntactpreference: '',
    dob: null,
    department: '0',
    isactive: false

  };

  constructor(private _employeeService: EmployeeService, private _router: Router) { }

  ngOnInit() {

  }
  processEmployeeForm() {
    console.log(this.empmodel);
    this._employeeService.save(this.empmodel);
    this._router.navigate(['/employeelist']);
    // console.log(empformData.value);
  }
}
