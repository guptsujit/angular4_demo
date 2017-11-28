import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthComponent } from './auth/auth.component';
//import { UserComponent } from './admin/user.component';

// common module is required if we are loading component other than app module and using ngFor 
//import { CommonModule } from '@angular/common'; 
const routes: Routes = [
  {path: '',component:HomeComponent,children: []},
  {path: 'home',component:HomeComponent,children: []},
  {path: 'login',component:AuthComponent},
  //{path: 'dashboard',component:UserComponent},
];

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  HeaderComponent,
  FooterComponent,
  AuthComponent
];
