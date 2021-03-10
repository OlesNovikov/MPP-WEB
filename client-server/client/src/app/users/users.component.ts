import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { HttpRequestService } from '../services/httpRequest.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users = {};

  constructor(private service: HttpRequestService) { }

  ngOnInit(): void {
    
  }

  public loadUsers() {
    this.service.get('http://localhost:1234/users').subscribe(data => {
      console.log(data);
      this.users = data;
    })
  }

}
