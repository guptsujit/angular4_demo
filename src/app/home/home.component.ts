import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  post: { post: string, date: Date };

  exampleAsync :Promise<string>;
  exampleAsync2 :Observable<string>;
  constructor(private _employeeService: EmployeeService) { }

  ngOnInit() {
    
    this._employeeService.savePostDetail().subscribe((response)=>{
      console.log(response);
    });

    this._employeeService.getPostDetail().subscribe((response) => {
      this.post = response;
    });

    this.exampleAsync = new Promise((resolve,reject)=>{
      return resolve("Async promise example");
    })
  
    this.exampleAsync2 = new Observable((obserber)=>{
       obserber.next("Hello observable async pipe");
    })
  }

}
