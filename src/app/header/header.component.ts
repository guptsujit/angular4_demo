import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {
  @Input()
  userSession: any = {};
  constructor(private _authService: AuthService,private _router : Router) { }

  ngOnInit() {
  }
  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
