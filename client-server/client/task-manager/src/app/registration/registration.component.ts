import { Component, OnInit } from '@angular/core';
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

  constructor(private service: HttpRequestService) { }

  ngOnInit(): void {
  }
  
  registrateUser(user: User) {
    this.service.post(`registration`, user).subscribe(data => {
      console.log(data.user);
      localStorage.setItem('userToken', data.token);
    });
  }
}
