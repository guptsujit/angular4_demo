import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class OnlyAdminRoleGuard implements CanActivate {
  constructor(private _authService: AuthService,private _router :Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log("OnlyAdminRoleGuard");
      //return true;
      if(this._authService.getUserRole()=='admin'){
        return true;
      }else{
        //alert('You dont have permission to view the page');
        this._router.navigate(['/home']);
        return false;
      }
  }
}
