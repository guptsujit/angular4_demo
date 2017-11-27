import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Usermodel } from './user-model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],

})
export class UserComponent implements OnInit {
  private users: Usermodel[];
  private statusMessage: string = "Data is loading..Please wait..";
  constructor(private _userservice: UserService) { }

  ngOnInit() {
    this.getUser();
  }
  getUser():void {
    this._userservice.getUsersWithObservable().subscribe(response => {
      this.users = response;
      if (!this.users.length) {
        this.statusMessage = "No user found";
      }
    },
      error => {
        this.statusMessage = "Something went wrong.Please try again later";
      }
    );
  }
}
