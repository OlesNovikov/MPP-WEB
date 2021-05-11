import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/models/task';
import { HttpRequestService } from '../services/httpRequest.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Apollo, QueryRef } from 'apollo-angular';
import { Queries } from 'src/models/queries';

@Component({
    selector: 'app-task-create',
    templateUrl: './task-create.component.html',
    styleUrls: ['./task-create.component.css']
})

export class TaskCreateComponent implements OnInit {
    task: Task = new Task('', '', 0, 0, 1, 1, '', '');
    currUser: any;
    users: any;
    statuses: any;
    priorities: any;
    uploadForm: FormGroup;
    errorAlert = { isActive: false, message: '' };
    private usersQuery!: QueryRef<any>;
    private statusesQuery!: QueryRef<any>;
    private prioritiesQuery!: QueryRef<any>;
    private currentUserQuery!: QueryRef<any>;
    private saveTaskQuery!: QueryRef<any>;

    constructor(
        private httpService: HttpRequestService,
        private router: Router,
        private formBuilder: FormBuilder,
        private apollo: Apollo
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
        this.refresh();
    }

    private refresh() {
        this.usersQuery.refetch();
        this.statusesQuery.refetch();
        this.prioritiesQuery.refetch();
        this.currentUserQuery.refetch();
    }

    getCurrentUser() {
        this.currentUserQuery = this.apollo.watchQuery<any>({
            query: Queries.CurrentUser,
            variables: {
                token: localStorage.getItem('userToken')
            }
        });

        this.currentUserQuery.valueChanges.subscribe((response: any) => {
            this.currUser = response.data.user.content;
        });
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

    closeAlert() {
        this.errorAlert = { isActive: false, message: '' };
    }

    dontSaveChanges() {
        if (confirm("Changes will not be saved. Are you sure you want to leave this page?")) {
            this.router.navigateByUrl('tasks');
        }
    }

    saveChanges() {
        const task = {
            title: this.task.title,
            status_id: Number(this.task.status_id),
            description: this.task.description,
            deadline: this.task.deadline.toString(),
            author_id: Number(this.currUser.id),
            executor_id: Number(this.task.executor_id),
            priority_id: Number(this.task.priority_id),
            filename: this.task.filename,
            token: localStorage.getItem('userToken')
        };

        this.saveTaskQuery = this.apollo.watchQuery<any>({
            query: Queries.NewTask,
            variables: task
        });

        this.saveTaskQuery.valueChanges.subscribe((response: any) => {
            if (response.data.createTask.status == 200) {
                this.router.navigateByUrl('tasks');
            }
        }, (error) => {
            console.log('error: ', error);
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
