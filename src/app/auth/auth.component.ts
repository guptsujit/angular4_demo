import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: ['.help-block { color: red; }'],
  providers: [AuthService],
})
export class AuthComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  errorMessage: string = '';
  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    if (localStorage.hasOwnProperty('currentUser')) {
      this._router.navigate(['/dashboard']);
    }

  }
  processLogin(formData) {
    this.loading = true;
    if (formData.valid) {
      this._authService.login(formData.value)
        .subscribe(data => {
          if (!data.error) {
            //localStorage.setItem('currentUser', JSON.stringify(data));
            this._router.navigate(['/dashboard']);

          } else {
            this.errorMessage = "Invalid email or password";
          }
        },
        (error) => {
          this.loading = false;
          this.errorMessage = "Something went wrong.Please try again later.";

        });
    }

  }
}
