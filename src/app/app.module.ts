import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
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
import { CreateEmployeeCanDeactivateGuardServiceGuard } from './employee/create-employee-can-deactivate-guard-service.guard';
import { EmployeeListResolveServiceGuard } from './employee/employee-list-resolve-service.guard';
import { EmpployeeDetailGuardServiceGuard } from './employee/empployee-detail-guard-service.guard';
import { EmployeeListComponent } from './employee/employee-list.component';
import { EmployeeService } from './employee/employee.service';
import { ViewEmployeeComponent } from './employee/view-employee.component';
import { EmployeeFilterPipe } from './employee/employee-filter.pipe';

const appRoute: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'employeelist', component: EmployeeListComponent,
    resolve : {listofemployee : EmployeeListResolveServiceGuard}
  },
  { path: 'viewemployee/:id', component: ViewEmployeeComponent,
   canActivate:[EmpployeeDetailGuardServiceGuard] 
 },
  { 
    path: 'create', component: CreateEmployeeComponent,
    canDeactivate:[CreateEmployeeCanDeactivateGuardServiceGuard] 
   
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound', pathMatch: 'full'},
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
    ConfirmEqualValidatorDirective,
    EmployeeListComponent,
    ViewEmployeeComponent,
    EmployeeFilterPipe
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoute),FormsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),HttpClientModule 
  ],
  providers: [CreateEmployeeCanDeactivateGuardServiceGuard,
             EmployeeService,EmployeeListResolveServiceGuard,
             EmpployeeDetailGuardServiceGuard,

            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
