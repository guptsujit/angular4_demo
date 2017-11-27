import { Injectable } from '@angular/core';
import { Http, Response ,Headers,RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Usermodel } from './user-model';
import 'rxjs/add/operator/map';
@Injectable()
export class UserService {

  constructor(private _http: Http) { }
  public getUsersWithObservable(): Observable<Usermodel[]> {

    let url = "http://localhost/api/db.php?action=get_user";
    return this._http.get(url).map(this.extractData);
  }
  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body;
  }
}
