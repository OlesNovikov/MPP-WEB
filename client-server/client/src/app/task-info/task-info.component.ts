import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from '../services/httpRequest.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css']
})

export class TaskInfoComponent implements OnInit {
  taskId = '';
  task: any;
  users: any;
  statuses: any;
  priorities: any;
  dateTime: Date = new Date();
  deadline = '';
  uploadForm: FormGroup;
  filename = '';

  constructor(
              private httpService: HttpRequestService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private http: HttpClient
              ) { 
  this.uploadForm = this.formBuilder.group({
      fileInput: ['']
  });
  }

  ngOnInit(): void {
    this.getTaskInfo();
    this.getUsers();
    this.getStatuses();
    this.getPriorities();
  }

  downloadFile() {
    this.httpService.getFile('file/download/' + this.filename, { responseType: "blob" })
    .toPromise()
    .then(blob => {
        saveAs(blob, this.filename); 
    })
    .catch(err => console.error("download error = ", err));
  }

  getUsers() {
    this.httpService.get('users').subscribe(data => {
      this.users = data;
    })
  }

  getStatuses() {
    this.httpService.get('statuses').subscribe(data => {
      this.statuses = data;
    })
  }

  getPriorities() {
    this.httpService.get('priorities').subscribe(data => {
      this.priorities = data;
    })
  }
  
  getTaskInfo() {
    this.route.params.subscribe(
      params => this.taskId = params['id']
    );

    this.httpService.get('tasks/' + this.taskId).subscribe(data => {
      this.task = data[0];
      const f_name = this.task.filename;
      this.filename = f_name;
      this.deadline = this.task.deadline;
      this.dateTime = new Date(this.task.deadline);
    })
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

    this.httpService.post('file/upload', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  public dontSaveChanges() {
    if (confirm("Changes will not be saved. Are you sure you want to leave this page?")) {
        this.router.navigateByUrl('tasks');
      }
  }

  public saveChanges() {
    this.httpService.put('tasks/' + this.task.id, this.task).subscribe(data => {
      this.router.navigateByUrl('tasks');
    })
  }
}
