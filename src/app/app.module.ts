import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent,
   routingComponents

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
