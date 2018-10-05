import { Injectable } from '@angular/core'  
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse,HttpErrorResponse } from '@angular/common/http';  
import { Observable,throwError } from 'rxjs';  
import { catchError,tap} from 'rxjs/operators';

@Injectable()  
export class ErrorInterceptor implements HttpInterceptor {
    errorMessage : any;  
    constructor(){}
    intercept(req: HttpRequest<any>, next: HttpHandler) {  
        
          return next.handle(req).pipe(catchError((error:HttpErrorResponse)=>{
              this.errorMessage = error;
              console.log(error.statusText);
              return throwError(error);
          }));
       
      
        }
         
    }  
 