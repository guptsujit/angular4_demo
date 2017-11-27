import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from './user.component';
import { UserService } from './user.service';
const routeadmin: Routes = [

  { path: 'dashboard', component: UserComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routeadmin),
    CommonModule
  ],
  providers: [UserService],
  declarations: [UserComponent]
})
export class AdminModule { }
