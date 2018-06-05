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
  addClasses : boolean = true;
  //classesToApply:string  = "btn btn-info"; //will add class btn btn-info and and will remove all existing css class
  classesToApply:string  = this.addClasses ? "btn btn-info" : "btn btn-primary"; // will add class and will keep existing css class

  applyBoldClass :boolean = true;
  applyItalicClass : boolean = false;
  applyNormalClass : boolean = true;

  addStyle : boolean = true;
  //styleToApply : string = "bold";
  styleToApply:string  = this.addStyle ? "30" : "20";
  constructor(private _employeeService: EmployeeService, private _router: Router) { }

  ngOnInit() {

  }
  processEmployeeForm() {
    this._employeeService.save(this.empmodel);
    this._router.navigate(['/employeelist']);
  }
  // We use ngClass directive to add or remove multiple css classes on template
  addOrMultipleClasses(){
    return {
       boldClass : this.applyBoldClass,
       italicClass : this.applyItalicClass,
       normalClass : this.applyNormalClass,
    };
  }
  addOrMultipleStyle(){
    return {
      'background-color':  this.addStyle ? "green" : "red",
      'font-size': '25px',
      'font-weight': 'bold'
      }
  }
}
