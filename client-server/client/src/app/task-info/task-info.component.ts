import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from '../services/httpRequest.service';
import { saveAs } from 'file-saver';
import { Apollo, QueryRef } from 'apollo-angular';
import { Queries } from 'src/models/queries';
import { Task } from 'src/models/task';

@Component({
    selector: 'app-task-info',
    templateUrl: './task-info.component.html',
    styleUrls: ['./task-info.component.css']
})

export class TaskInfoComponent implements OnInit {
    taskId = '';
    public task: Task = new Task();
    users: any;
    statuses: any;
    priorities: any;
    dateTime: Date = new Date();
    deadline = '';
    uploadForm: FormGroup;
    filename = '';
    public description: string = '';
    public title: string = '';
    public executor_id!: number;
    public status_id!: number;
    public priority_id!: number;
    public new_deadline: string = '';
    public new_filename: string = '';
    private usersQuery!: QueryRef<any>;
    private statusesQuery!: QueryRef<any>;
    private prioritiesQuery!: QueryRef<any>;
    private taskInfoQuery!: QueryRef<any>;

    constructor(
        private httpService: HttpRequestService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private apollo: Apollo
    ) {
        this.uploadForm = this.formBuilder.group({
            fileInput: ['']
        });

        this.route.params.subscribe(
            params => this.taskId = params['id']
        );
    }

    ngOnInit(): void {
        this.getTaskInfo();
        this.getUsers();
        this.getStatuses();
        this.getPriorities();
        this.refresh();
    }

    private refresh() {
        this.usersQuery.refetch();
        this.statusesQuery.refetch();
        this.prioritiesQuery.refetch();
        this.taskInfoQuery.refetch();
    }

    getUsers() {
        this.usersQuery = this.apollo.watchQuery<any>({
            query: Queries.Users,
            variables: {
                token: localStorage.getItem('userToken')
            }
        });

        this.usersQuery.valueChanges.subscribe((response: any) => {
            this.users = response.data.users.content;
        });
    }

    getStatuses() {
        this.statusesQuery = this.apollo.watchQuery<any>({
            query: Queries.Statuses,
            variables: {
                token: localStorage.getItem('userToken')
            }
        });

        this.statusesQuery.valueChanges.subscribe((response: any) => {
            this.statuses = response.data.statuses.content;
        });
    }

    getPriorities() {
        this.prioritiesQuery = this.apollo.watchQuery<any>({
            query: Queries.Priorities,
            variables: {
                token: localStorage.getItem('userToken')
            }
        });

        this.prioritiesQuery.valueChanges.subscribe((response: any) => {
            this.priorities = response.data.priorities.content;
        });
    }

    getTaskInfo() {
        this.taskInfoQuery = this.apollo.watchQuery<any>({
            query: Queries.Task,
            variables: {
                id: Number(this.taskId),
                token: localStorage.getItem('userToken')
            }
        });

        this.taskInfoQuery.valueChanges.subscribe(response => {
            const data = response.data.task.content;
            this.task = data;

            this.title = this.task.title;
            this.description = this.task.description;
            this.executor_id = this.task.executor_id;
            this.status_id = this.task.status_id;
            this.priority_id = this.task.priority_id;
            this.deadline = JSON.parse(this.task.deadline);
            this.filename = this.task.filename;
            
        });
    }

    onFileSelect(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.uploadForm.get('fileInput')?.setValue(file);
            this.new_filename = file.name;
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

    downloadFile() {
        this.httpService.getFile('file/download/' + this.filename, { responseType: "blob" })
            .toPromise()
            .then(blob => {
                saveAs(blob, this.filename);
            })
            .catch(err => console.error("download error = ", err));
    }

    public dontSaveChanges() {
        if (confirm("Changes will not be saved. Are you sure you want to leave this page?")) {
            this.router.navigateByUrl('tasks');
        }
    }

    public saveChanges() {
        const filename = this.new_filename !== '' ? this.new_filename : this.filename;
        const deadline = this.new_deadline !== '' ? this.new_deadline : this.deadline;
        const newTask = new Task(
            this.title, this.description, Number(this.users[0].id), Number(this.executor_id),
            Number(this.priority_id), Number(this.status_id), filename, deadline
        );
        
        this.httpService.put('tasks/' + this.taskId, newTask).subscribe(data => {
            this.router.navigateByUrl('tasks');
        })
    }
}
