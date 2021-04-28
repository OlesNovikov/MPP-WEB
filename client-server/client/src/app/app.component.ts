import { Component, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { events } from 'src/environments/events';
import { DataManagerService } from './data-manager.service';
import { TasksComponent } from './tasks/tasks.component';
import { IWsMessage } from './websockets/websocket.interfaces';
import { WebsocketService } from './websockets/websocket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'task-manager';
    
    constructor(private websocketService: WebsocketService,
        public dataManager: DataManagerService,
        private router: Router) {

        this.websocketService.on<IWsMessage<any>>(events.message).subscribe(response => {
            const event = response.event;
            const data = response.data;

            console.log('response from server: ', response);

            if (event == events.registration) {
                if (data.user) {
                    localStorage.setItem('userToken', data.token);
                    this.router.navigateByUrl('tasks');
                }
                else {
                    dataManager.regError.next(data);
                }
            }
            else if (event == events.login) {
                if (data.user) {
                    dataManager.user.next(data.user);
                    localStorage.setItem('userToken', data.token);
                }
                else {
                    dataManager.logError.next(data);
                }
            }
            else if (event == events.getTasks) {
                dataManager.tasks.next(data);
            }
            else if (event == events.deleteTask) {
                dataManager.deletedTask.next(response.data);
            }
            else if (event == events.getTask) {
                dataManager.taskInfo.next(response.data);
            }
            else if (event == events.updateTask) {
                dataManager.updatedTaskStatus.next(response);
            }
            else if (event == events.getPriorities) {
                dataManager.priorities.next(response.data);
            }
            else if (event == events.getStatuses) {
                dataManager.statuses.next(response.data);
            }
            else if (event == events.createTask) {
                dataManager.createdTask.next(response);
            }
            else if (event == events.getUser) {
                dataManager.user.next(response.data[0]);
            }
            else if (event == events.getUsers) {
                dataManager.users.next(response.data);
            }
        });
    }
}
