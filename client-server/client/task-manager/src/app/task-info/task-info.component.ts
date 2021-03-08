import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from '../services/httpRequest.service';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css']
})

export class TaskInfoComponent implements OnInit {
  taskId = '';
  task: any;

  constructor(
              private httpService: HttpRequestService,
              private route: ActivatedRoute,
              private router: Router
            ) { }

  ngOnInit(): void {
    this.getTaskInfo();
  }

  public getTaskInfo() {
    this.route.params.subscribe(
      params => this.taskId = params['id']
    );

    this.httpService.get('tasks/' + this.taskId).subscribe(data => {
      this.task = data[0];
      console.log('input task: ', this.task);
    })
  }

  public dontSaveChanges() {
    if (confirm("Changes will not be saved. Are you sure you want to leave this page?")) {
        this.router.navigateByUrl('tasks');
      }
  }

  public saveChanges() {
    console.log('output task: ', this.task);
    this.httpService.put('tasks/' + this.task.id, this.task).subscribe(data => {
      this.router.navigateByUrl('tasks');
    })
  }
}
