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

  constructor(
              private httpService: HttpRequestService,
              private router: Router
  ) { }

  ngOnInit(): void {
  }

  public dontSaveChanges() {
    if (confirm("Changes will not be saved. Are you sure you want to leave this page?")) {
        this.router.navigateByUrl('tasks');
      }
  }

  public saveChanges() {
    this.httpService.post('tasks/create', this.task).subscribe(data => {
      this.router.navigateByUrl('tasks');
    })
  }
}
