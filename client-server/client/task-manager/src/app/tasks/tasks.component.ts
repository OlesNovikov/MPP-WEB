import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../services/httpRequest.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  alert = false;
  tasks: any[] = [];

  constructor(private service: HttpRequestService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  public getTasks() {
    this.service.get('tasks').subscribe(data => {
      //console.log(data);
      //console.log(data[0].author);
      //console.log(data[0].executor);
      this.tasks = data;
      this.alert = true;
    });
  }

  public deleteTask(id: string) {
    if (confirm("Are you sure you want to delete task?")) {
      this.service.delete('tasks/' + id).subscribe(data => {
        this.getTasks();
      })
    }
  }
}
