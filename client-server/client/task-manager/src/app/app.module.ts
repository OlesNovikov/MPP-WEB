import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistrationComponent } from './registration/registration.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule }   from '@angular/common/http';
import { HttpRequestService } from './services/httpRequest.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, RegistrationComponent, TasksComponent, UsersComponent, PageNotFoundComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }