import { Component, OnInit } from '@angular/core';
import { Task } from 'src/models/task';
import { HttpRequestService } from '../services/httpRequest.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  alert = false;
  tasks: Task[] = [];

  constructor(private service: HttpRequestService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  public getTasks() {
    this.service.get('tasks').subscribe(data => {
      console.log(data);
      this.tasks = data;
      this.alert = true;
    });
  }

  public closeAlert() {
    this.alert = false;
  }

}
