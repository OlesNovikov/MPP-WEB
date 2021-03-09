import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/models/task';
import { HttpRequestService } from '../services/httpRequest.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})

export class TaskCreateComponent implements OnInit {
  task: Task = new Task();
  users: any;
  statuses: any;
  priorities: any;

  constructor(
              private httpService: HttpRequestService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getStatuses();
    this.getPriorities();
  }

  getUsers() {
    this.httpService.get('users').subscribe(data => {
      this.users = data;
      console.log(this.users);
    })
  }

  getStatuses() {
    this.httpService.get('statuses').subscribe(data => {
      this.statuses = data;
      console.log(this.statuses);
    })
  }

  getPriorities() {
    this.httpService.get('priorities').subscribe(data => {
      this.priorities = data;
      console.log(this.priorities);
    })
  }

  dontSaveChanges() {
    if (confirm("Changes will not be saved. Are you sure you want to leave this page?")) {
        this.router.navigateByUrl('tasks');
      }
  }

  saveChanges() {
    this.httpService.post('tasks/create', this.task).subscribe(data => {
      this.router.navigateByUrl('tasks');
    })
  }
}
