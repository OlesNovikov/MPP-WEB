import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from '../services/httpRequest.service';
import { saveAs } from 'file-saver';
import { WebsocketService } from '../websockets/websocket.service';
import { events } from 'src/environments/events';
import { DataManagerService } from '../data-manager.service';
import { Request } from 'src/models/wsRequest';

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
    filename = undefined;

    constructor(
        private httpService: HttpRequestService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private websocketService: WebsocketService,
        private dataManager: DataManagerService
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

        this.dataManager.taskInfo.subscribe(data => {
            this.task = data[0];
            const f_name = this.task.filename;
            this.filename = f_name;
            this.deadline = this.task.deadline;
            this.dateTime = new Date(this.task.deadline);
        });

        this.dataManager.statuses.subscribe(data => {
            this.statuses = data;
        });

        this.dataManager.priorities.subscribe(data => {
            this.priorities = data;
        });

        this.dataManager.users.subscribe(data => {
            this.users = data;
        });

        this.dataManager.updatedTaskStatus.subscribe(data => {
            if (data.status === 200) {
                this.router.navigateByUrl('tasks');
            }
        });
    }

    downloadFile() {
        if (this.filename) {
            this.httpService.getFile('file/download/' + this.filename, { responseType: "blob" })
            .toPromise()
            .then(blob => {
                console.log(blob);
                saveAs(blob, this.filename);
            })
            .catch(err => console.error("download error = ", err));
        }
    }

    getUsers() {
        const token = localStorage.getItem('userToken');
        this.websocketService.send(events.getUsers, new Request(events.getUsers, null, token, null));
    }

    getStatuses() {
        const token = localStorage.getItem('userToken');
        this.websocketService.send(events.getStatuses, new Request(events.getStatuses, null, token, null));
    }

    getPriorities() {
        const token = localStorage.getItem('userToken');
        this.websocketService.send(events.getPriorities, new Request(events.getPriorities, null, token, null));
    }

    getTaskInfo() {
        this.route.params.subscribe(
            params => this.taskId = params['id']
        );

        const token = localStorage.getItem('userToken');
        this.websocketService.send(events.getTask, new Request(events.getTask, { id: this.taskId }, token, null));
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
        const token = localStorage.getItem('userToken');
        this.websocketService.send(events.updateTask, new Request(events.updateTask, { id: this.taskId }, token, this.task));
    }
}
