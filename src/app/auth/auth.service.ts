import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {
  isLogin: boolean = false;
  constructor(private _http: Http) { }
  login(formData) {
    let url = "http://localhost/api/db.php?action=check_login";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(url, formData, options)
      .map(this.extractData);

  }
  private extractData(res: Response) {

    let body = res.json();
    if (!body.error) {
      localStorage.setItem('currentUser', JSON.stringify(body))
      this.isLogin = true;
    }
    return body;

  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
  getUserRole(): string | boolean {
    if (localStorage.hasOwnProperty('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).role;
    }else{
      return false;
    }
  }
}
