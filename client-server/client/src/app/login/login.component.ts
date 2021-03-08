import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { HttpRequestService } from '../services/httpRequest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorAlert = { isActive: false, message: '' };

  constructor(
    private httpService: HttpRequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public closeAlert() {
    this.errorAlert = { isActive: false, message: ''};
  }

  LogInUser(user: User) {
    this.httpService.post(`login`, user).subscribe(data => {
      console.log(data);
      localStorage.setItem('userToken', data.token);
      this.router.navigateByUrl('tasks');
    },
    (error) => {
      console.log(error.error.message);
      let message = ' ';
      error.error.message.forEach((element: string) => {
        message += element + '; ';
      });
      this.errorAlert = { isActive: true, message: message };
    });
  }

}
