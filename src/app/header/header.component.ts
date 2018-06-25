import { Component, OnInit,Input,OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Input()
aboutus : string;
authListerSub: Subscription;
userisAuthenticated: boolean = false;
  constructor(private _authService:AuthService) { }

  ngOnInit() {
    this.authListerSub = this._authService.getAuthStatusListener().subscribe((isAuthenticated)=>{
      this.userisAuthenticated = isAuthenticated;
    });
  }
  ngOnDestroy() {
    this.authListerSub.unsubscribe();
  }
  logout(){
    this._authService.logout();
  }
}
