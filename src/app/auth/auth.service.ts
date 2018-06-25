import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>()
  constructor(private _http: HttpClient,private _router :Router) { }
  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
    
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  login(data: { email: string, password: any }) {
    // authenticate with node
    let url = "http://localhost:3000/api/user/login";
    return this._http.post<{ token: string }>(url, data).subscribe((response) => {
      
      const token = response.token;
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this._router.navigate(['/employeelist']);
        return true;
      }
      this._router.navigate(['/login']);
    });
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this._router.navigate(['/login']);
    return true;
  }
}
