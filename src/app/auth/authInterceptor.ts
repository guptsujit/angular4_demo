import { Injectable } from '@angular/core'  
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import {AuthService} from './auth.service';
  
@Injectable()  
export class AuthInterceptor implements HttpInterceptor {  
    constructor(private _authService:AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler) {  
        const webToken =  this._authService.getToken();
        const authRequest = req.clone({ 
            headers : req.headers.set("Authorization","bearer " + webToken)
           
        })     
        return next.handle(authRequest);  
    }  
} 