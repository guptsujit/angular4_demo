import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee-model';
import { EmployeeService } from '../employee/employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListResolveServiceGuard implements Resolve<Employee[]> {

  constructor(private _employeeService:EmployeeService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[]>{
   return this._employeeService.getEmployees();
  }
}
