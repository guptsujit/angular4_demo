import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
//import { UserComponent } from './admin/user.component';

// common module is required if we are loading component other than app module and using ngFor 
//import { CommonModule } from '@angular/common'; 
const routes: Routes = [
  {path: '',component:HomeComponent,children: []},
  {path: 'login',component:LoginComponent},
  //{path: 'dashboard',component:UserComponent},
];

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent, 
    //UserComponent
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  HeaderComponent,
  FooterComponent,
];
