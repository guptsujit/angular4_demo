import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from './auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authService:AuthService) { }

  ngOnInit() {
  }
  processLoginForm(loginform:NgForm){
    if(loginform.invalid){
      return;
    }
    this._authService.login(loginform.value);

  }
}
