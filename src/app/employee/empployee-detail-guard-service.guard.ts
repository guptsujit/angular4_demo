import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee/employee.service';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root',

})
export class EmpployeeDetailGuardServiceGuard implements CanActivate {
  isexist : boolean = true;
  constructor(private _employeeService: EmployeeService, private _router: Router, private _authService: AuthService ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
     // redirect user to login page if user is not login
     const isAuth = this._authService.getIsAuth();
    if(!isAuth){
      this._router.navigate(['/login']);
      return true;
    }

    let empid = +route.paramMap.get('id');
     
    const isEmployeeExist = !!this._employeeService.getEmployeeDetail(empid);
    console.log(isEmployeeExist);
    if (isEmployeeExist) {
      return true;
    } else {
      this._router.navigate(['/notfound']);
      return false;
    }
 
    
   
  

    /*this._employeeService.getEmployeeDetail(empid).forEach((employee)=>{
      if (Object.keys(employee).length) {
        return true;
      } else {
        this._router.navigate(['/notfound']);
        return false;
      }
    });*/

  }
}
