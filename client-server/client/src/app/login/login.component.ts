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

  closeAlert() {
    this.errorAlert = { isActive: false, message: ''};
  }

  LogInUser(user: User) {
    this.httpService.post('login', user).subscribe(data => {
      localStorage.setItem('userToken', data.token);
      this.router.navigateByUrl('tasks');
    },
    (error) => {
      console.log(error);
      let message = ' ';
      if (error.error.message) {
        error.error.message.forEach((element: string) => {
          message += element + '; ';
        });
      }
      else {
        message += 'Server connection aborted';
      }

      this.errorAlert = { isActive: true, message: message };
    });
  }

}
