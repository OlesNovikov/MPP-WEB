import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { events } from 'src/environments/events';
import { Request } from 'src/models/wsRequest';
import { DataManagerService } from '../data-manager.service';
import { HttpRequestService } from '../services/httpRequest.service';
import { WebsocketService } from '../websockets/websocket.service';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
    alert = false;
    tasks: any[] = [];
    errorAlert = { isActive: false, message: '' };

    constructor(private websocketService: WebsocketService,
        private dataManager: DataManagerService,
        private router: Router) { 

            this.dataManager.tasks.subscribe(data => {
                console.log('dataManager.tasks');
                this.tasks = data;
            });
    
            this.dataManager.deletedTask.subscribe(data => {
                console.log('dataManager.deletedTask');
                this.getTasks();
            });
        }

    ngOnInit(): void {
        this.getTasks();
    }

    public navigateToCreateTaskLink() {
        this.router.navigateByUrl('tasks/create');
    }

    public getTasks() {
        const token = localStorage.getItem('userToken');
        console.log('getTasks()');
        this.websocketService.send(events.getTasks, new Request(events.getTasks, null, token, null));
    }

    closeAlert() {
        this.errorAlert = { isActive: false, message: '' };
    }

    public deleteTask(id: string) {
        if (confirm("Are you sure you want to delete task?")) {
            const token = localStorage.getItem('userToken');
            console.log('deleteTask()');
            this.websocketService.send(events.deleteTask, new Request(events.deleteTask, { id: id }, token, null));
        }
    }
}
