import { HttpClient } from '@angular/common/http';
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
  
  async registrateUser(user: User) {
    this.receivedUser = await this.service.post(`http://httpbin.org/post`, user);
  }
}
