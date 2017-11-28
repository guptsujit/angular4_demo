import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  template: `<app-header [userSession] = "userSession"></app-header>
            <router-outlet></router-outlet>
            <app-footer></app-footer>`,
           

})
export class AppComponent {
  title = 'Welcome to intensity';
  userSession : any = {};
  constructor(private _authService: AuthService, private _router: Router, private _title: Title) { }
  ngOnInit() {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getTitle(this._router.routerState, this._router.routerState.root);

        this.userSession = JSON.parse(localStorage.getItem('currentUser'));

        if (!localStorage.hasOwnProperty('currentUser')) {
          this._router.navigate(['/login']);
        }
        // if(localStorage.hasOwnProperty('currentUser') && this._router.routerState.snapshot.url=='/login'){
        //this._router.navigate(['/userlist']);
        // }

      }
    });


  }
  getTitle(state, parent) {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      this._title.setTitle(parent.snapshot.data.title);
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(this.getTitle(state, state.firstChild(parent)));
    }

  }
}
