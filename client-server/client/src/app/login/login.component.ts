import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { events } from 'src/environments/events';
import { User } from 'src/models/user';
import { Request } from 'src/models/wsRequest';
import { DataManagerService } from '../data-manager.service';
import { WebsocketService } from '../websockets/websocket.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    user: User = new User();
    errorAlert = { isActive: false, message: '' };

    constructor(
        private websocketService: WebsocketService,
        private dataManager: DataManagerService,
        private router: Router,
    ) {
        this.dataManager.user.subscribe(data => {
            this.router.navigateByUrl('tasks');
        });

        this.dataManager.logError.subscribe(error => {
            let message = ' ';
            error.forEach((element: string) => {
                message += element + '; ';
            });

            this.errorAlert = { isActive: true, message: message };
        });
     }

    ngOnInit(): void {
        
    }

    closeAlert() {
        this.errorAlert = { isActive: false, message: '' };
    }

    LogInUser(user: User) {
        this.websocketService.send(events.login, new Request(events.login, null, null, user));
    }
}
