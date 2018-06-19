import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  post: { post: string, date: Date };
  constructor(private _employeeService: EmployeeService) { }

  ngOnInit() {
    
    this._employeeService.savePostDetail().subscribe((response)=>{
      console.log(response);
    });

    this._employeeService.getPostDetail().subscribe((response) => {
      this.post = response;
    })
  }

}
