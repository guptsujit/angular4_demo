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
  private authStatusListener = new Subject<boolean>();
  //private tokenTimer :NodeJS.Timer;
  private tokenTimer :any;
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
    return this._http.post<{ token: string,expiresIn:string }>(url, data).subscribe((response) => {
      
      const token = response.token;
      console.log(response);
      if (token) {
       
        this.token = token;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const expireInDuration = +response.expiresIn;
       
        this.setAuthTimer(expireInDuration);
        const now = new Date();
        // now.getTime() returns time in millisecond
        const expirationDate = new Date(now.getTime() + (+expireInDuration*1000));
        console.log(expirationDate);
        this.setAuthData(token,expirationDate);
        this._router.navigate(['/employeelist']);
        return true;
      }
      this._router.navigate(['/login']);
    });
  }
  setAuthData(token:string,expirationDate:Date){
    localStorage.setItem('token',token);
    localStorage.setItem('expirationDate',expirationDate.toISOString());
  }
  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }
  private setAuthTimer(duration:number){
    console.log('setting timer ' +duration);
    this.tokenTimer = setTimeout(()=>{
      this.logout();
    },duration*1000);

  }
  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    if(!token || !expirationDate){
      return;
    }
    return {
      token : token,
      expirationDate : new Date(expirationDate)
    }
  }
  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expireIn = authInformation.expirationDate.getTime()- now.getTime();
    if(expireIn>0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expireIn);
      this.authStatusListener.next(true);
    }
  }
  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this._router.navigate(['/login']);
    return true;
  }
}
