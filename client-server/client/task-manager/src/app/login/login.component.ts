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

  constructor(
    private httpService: HttpRequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  LogInUser(user: User) {
    this.httpService.post(`login`, user).subscribe(data => {
      console.log(data);
      if (data.status != 500) {
        localStorage.setItem('userToken', data.token);
        this.router.navigateByUrl('tasks');
      }
    });
  }

}
