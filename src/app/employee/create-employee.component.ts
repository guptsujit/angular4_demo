import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from 'src/app/models/department-model';
import { Employee } from 'src/app/models/employee-model';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
department:Department[] = [
  {id:1,name:'Help Desk'},
  {id:2,name:'HR'},
  {id:4,name:'IT'},
  {id:3,name:'Payroll'}
];

empmodel:Employee = {
  id:null,
  fullname:'',
  gender:'',
  email:'',
  phoneno:null,
  copntactpreference:'',
  dob:null,
  department:'0',
  isactive:false

};
  constructor() { }

  ngOnInit() {
  }
  processEmployeeForm(empformData:NgForm){
      console.log(empformData.value);
  }
}
