import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/models/task';
import { HttpRequestService } from '../services/httpRequest.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})

export class TaskCreateComponent implements OnInit {
  task: Task = new Task();
  currUser: any;
  users: any;
  statuses: any;
  priorities: any;
  uploadForm: FormGroup;
  errorAlert = { isActive: false, message: '' };

  constructor (
              private httpService: HttpRequestService,
              private router: Router,
              private formBuilder: FormBuilder,
              ) { 
    this.uploadForm = this.formBuilder.group({
      fileInput: ['']
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('fileInput')?.setValue(file);
      this.task.filename = file.name;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('fileInput')?.value);

    this.httpService.post('file/upload', formData).subscribe(data => {},
    (error) => {
      this.handleError(error);
    });
  }

  ngOnInit(): void {
    this.getUsers();
    this.getStatuses();
    this.getPriorities();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.httpService.get('user').subscribe(data => {
      this.currUser = data[0];
    },
    (error) => {
      this.handleError(error);
    });
  }

  getUsers() {
    this.httpService.get('users').subscribe(data => {
      this.users = data;
    },
    (error) => {
      this.handleError(error);
    });
  }

  getStatuses() {
    this.httpService.get('statuses').subscribe(data => {
      this.statuses = data;
    },
    (error) => {
      this.handleError(error);
    });
  }

  getPriorities() {
    this.httpService.get('priorities').subscribe(data => {
      this.priorities = data;
    },
    (error) => {
      this.handleError(error);
    });
  }

  closeAlert() {
    this.errorAlert = { isActive: false, message: ''};
  }

  dontSaveChanges() {
    if (confirm("Changes will not be saved. Are you sure you want to leave this page?")) {
        this.router.navigateByUrl('tasks');
    }
  }

  saveChanges() {
    this.httpService.post('tasks/create', this.task).subscribe(data => {
      this.router.navigateByUrl('tasks');
    },
    (error) => {
      this.handleError(error);
    });
  }

  handleError(error: any) {
    console.log(error);
      let message = ' ';
      if (error.error.message.length) {
        error.error.message.forEach((element: string) => {
          message += element + '; ';
        });
      } else if (error.error.message) {
        message += error.message + '; ';
      } else {
        message += 'Server connection aborted';
      }

      this.errorAlert = { isActive: true, message: message };
  }
}
