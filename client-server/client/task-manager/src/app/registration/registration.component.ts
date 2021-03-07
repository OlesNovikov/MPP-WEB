import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { HttpRequestService } from '../services/httpRequest.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [HttpRequestService]
})

export class RegistrationComponent implements OnInit {
  user: User = new User();
  receivedUser: any;

  constructor (
    private httpService: HttpRequestService,
    private router: Router 
    ) { }

  ngOnInit(): void {
  }
  
  registrateUser(user: User) {
    this.httpService.post(`registration`, user).subscribe(data => {
      console.log(data.user);
      localStorage.setItem('userToken', data.token);
      this.router.navigateByUrl('tasks');
    });
  }
}
