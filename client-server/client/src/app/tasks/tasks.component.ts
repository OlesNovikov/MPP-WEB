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
  errorAlert = { isActive: false, message: '' };

  constructor(private service: HttpRequestService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  public getTasks() {
    this.service.get('tasks').subscribe(data => {
      this.tasks = data;
      this.alert = true;
    }, 
    (error) => {
      console.log(error);
      let message = ' ';
      if (error.error.message.length) {
        error.error.message.forEach((element: string) => {
          message += element + '; ';
        });
      }
      else {
        message += error.error.message;
      }

      this.errorAlert = { isActive: true, message: message };
    });
  }

  closeAlert() {
    this.errorAlert = { isActive: false, message: ''};
  }

  public deleteTask(id: string) {
    if (confirm("Are you sure you want to delete task?")) {
      this.service.delete('tasks/' + id).subscribe(data => {
        this.getTasks();
      })
    }
  }
}
