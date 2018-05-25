import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import {FormsModule } from '@angular/forms';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SelectListValidatorDirective } from './custom_validator/select-list-validator.directive';
import { ConfirmEqualValidatorDirective } from './custom_validator/confirm-equal-validator.directive';

const appRoute: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreateEmployeeComponent },
  { path: '*', component: NotfoundComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EmployeeComponent,
    NotfoundComponent,
    CreateEmployeeComponent,
    SelectListValidatorDirective,
    ConfirmEqualValidatorDirective
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoute),FormsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot() 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
