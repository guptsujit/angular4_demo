import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateEmployeeComponent } from './create-employee.component';
@Injectable({
  providedIn: 'root'
})
export class CreateEmployeeCanDeactivateGuardServiceGuard implements CanDeactivate<CreateEmployeeComponent> {
  canDeactivate(component: CreateEmployeeComponent): boolean{
    if(component.CreateEmployeeForm.dirty){
      return confirm('Do you want to leave this page?');
    }
    return true;

  }
 
}
