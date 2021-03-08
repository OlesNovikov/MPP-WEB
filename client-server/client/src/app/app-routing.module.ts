import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistrationComponent } from './registration/registration.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskInfoComponent } from './task-info/task-info.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/create', component: TaskCreateComponent },
  { path: 'tasks/:id', component: TaskInfoComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }