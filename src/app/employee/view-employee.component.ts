import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee-model';
@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employee: Employee
  empid: number;
  constructor(private _route: ActivatedRoute, private _employeeService: EmployeeService, private _router: Router) { }

  ngOnInit() {
    this._route.paramMap.subscribe((parameter) => {
      this.empid = +parameter.get('id')
      this.employee = this._employeeService.getEmployeeDetail(this.empid);
    })

  }
  viewNextEmployee() {
    if (this.empid < 3) {
      this.empid = this.empid + 1;
    } else {
      this.empid = 1;
    }
    this._router.navigate(['/viewemployee', this.empid]);
  }
}
