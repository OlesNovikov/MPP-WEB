import { Component, OnInit } from '@angular/core';
import { events } from 'src/environments/events';
import { User } from 'src/models/user';
import { Request } from 'src/models/wsRequest';
import { DataManagerService } from '../data-manager.service';
import { WebsocketService } from '../websockets/websocket.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
})

export class RegistrationComponent implements OnInit {
    user: User = new User();
    errorAlert = { isActive: false, message: '' };

    constructor(
        private websocketService: WebsocketService,
        private dataManager: DataManagerService,
    ) { }

    ngOnInit(): void {
        this.dataManager.regError.subscribe(error => {
            let message = ' ';
            error.forEach((element: string) => {
                message += element + '; ';
            });

            this.errorAlert = { isActive: true, message: message };
        });
    }

    public closeAlert() {
        this.errorAlert = { isActive: false, message: '' };
    }

    registrateUser(user: User) {
        this.websocketService.send(events.message, new Request(events.registration, null, null, user));
    }
}
