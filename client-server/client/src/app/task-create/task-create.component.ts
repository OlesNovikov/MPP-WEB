import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/models/task';
import { HttpRequestService } from '../services/httpRequest.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WebsocketService } from '../websockets/websocket.service';
import { events } from 'src/environments/events';
import { DataManagerService } from '../data-manager.service';
import { Request } from 'src/models/wsRequest';

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
    executor_id = '';

    constructor(
        private httpService: HttpRequestService,
        private router: Router,
        private formBuilder: FormBuilder,
        private websocketService: WebsocketService,
        private dataManager: DataManagerService,
    ) {
        this.uploadForm = this.formBuilder.group({
            fileInput: ['']
        });

        this.dataManager.users.subscribe(data => {
            console.log('dataManager.users');
            this.users = data;
        });

        this.dataManager.user.subscribe(data => {
            console.log('dataManager.user');
            this.currUser = data;
            this.task.author_id = this.currUser.id;
        });

        this.dataManager.priorities.subscribe(data => {
            this.priorities = data;
            console.log('dataManager.priorities');
        });

        this.dataManager.statuses.subscribe(data => {
            console.log('dataManager.statuses');
            this.statuses = data;
        });

        this.dataManager.createdTask.subscribe(data => {
            console.log('dataManager.createdTask');
            if (data.status == 200) {
                this.router.navigateByUrl('tasks');
            }
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

        this.httpService.post('file/upload', formData).subscribe(data => { },
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
        const token = localStorage.getItem('userToken');
        console.log('getCurrentUser()');
        this.websocketService.send(events.getUser, new Request(events.getUser, null, token, null));
    }

    getUsers() {
        const token = localStorage.getItem('userToken');
        console.log('getUsers()');
        this.websocketService.send(events.getUsers, new Request(events.getUsers, null, token, null));
    }

    getStatuses() {
        const token = localStorage.getItem('userToken');
        console.log('getStatuses()');
        this.websocketService.send(events.getStatuses, new Request(events.getStatuses, null, token, null));
    }

    getPriorities() {
        const token = localStorage.getItem('userToken');
        console.log('getPriorities()');
        this.websocketService.send(events.getPriorities, new Request(events.getPriorities, null, token, null));
    }

    closeAlert() {
        this.errorAlert = { isActive: false, message: '' };
    }

    dontSaveChanges() {
        if (confirm("Changes will not be saved. Are you sure you want to leave this page?")) {
            console.log('dontSaveChanges()');
            this.router.navigateByUrl('tasks');
        }
    }

    saveChanges() {
        const token = localStorage.getItem('userToken');
        console.log('saveChanges()');
        this.websocketService.send(events.createTask, new Request(events.createTask, null, token, this.task));
    }

    handleError(error: any) {
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
