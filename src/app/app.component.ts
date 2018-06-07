import { Component, Input } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd ,NavigationCancel} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoaderIndicator = true;
  aboutus: string = "About Our Team";
  constructor(private _router: Router) {
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
}
