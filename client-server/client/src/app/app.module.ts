import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistrationComponent } from './registration/registration.component';
import { TasksComponent } from './tasks/tasks.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule, HTTP_INTERCEPTORS }   from '@angular/common/http';
import { HttpRequestService } from './services/httpRequest.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertClosableComponent } from './alert-closable/alert-closable.component';
import { HeadersInterceptor } from './services/requestHeaders.service';
import { TaskInfoComponent } from './task-info/task-info.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { GraphQLModule } from './graphql.module';
import { Subscription } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent, 
    RegistrationComponent, 
    TasksComponent,  
    PageNotFoundComponent, 
    LoginComponent, 
    AlertClosableComponent, 
    TaskInfoComponent, 
    TaskCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,
  ],
  providers: [
    HttpRequestService, {
    provide: HTTP_INTERCEPTORS,
    useClass: HeadersInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }