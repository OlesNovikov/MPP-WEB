import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Queries } from 'src/models/queries';
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
    private tasksQuery!: QueryRef<any>;

    constructor(
        private httpService: HttpRequestService,
        private apollo: Apollo) {
        }

    ngOnInit(): void {
        this.getTasks();
        this.refresh();
    }

    public getTasks() {
        this.tasksQuery = this.apollo.watchQuery<any>({
            query: Queries.Tasks,
            variables: {
                token: localStorage.getItem('userToken')
            }
        });

        this.tasksQuery.valueChanges.subscribe((response: any) => {
            this.tasks = response.data.tasks.content;
        });
    }

    private refresh() {
        this.tasksQuery.refetch();
    }

    closeAlert() {
        this.errorAlert = { isActive: false, message: '' };
    }

    public deleteTask(id: string) {
        if (confirm("Are you sure you want to delete task?")) {
            this.httpService.delete('tasks/' + id).subscribe(_ => {
                this.refresh();
            })
        }
    }
}
