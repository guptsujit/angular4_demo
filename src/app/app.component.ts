import { Component, Input, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showLoaderIndicator = true;
  aboutus: string = "About Our Team";
  constructor(private _router: Router, private _authService: AuthService) {
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        if (routerEvent.url == '/employeelist') {
          this.showLoaderIndicator = true;
        } else {
          this.showLoaderIndicator = false;
        }

      }
      if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel) {
        this.showLoaderIndicator = false;
      }
    });
  }

  ngOnInit() {
    this._authService.autoAuthUser();
  }
}
