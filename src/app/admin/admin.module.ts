import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { OnlyAdminRoleGuard } from '../guard/only-admin-role.guard';
const routeadmin: Routes = [

  { path: 'dashboard', component: UserComponent,canActivate: [OnlyAdminRoleGuard]},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routeadmin),
    CommonModule
  ],
  providers: [UserService,OnlyAdminRoleGuard],
  declarations: [UserComponent]
})
export class AdminModule { }
