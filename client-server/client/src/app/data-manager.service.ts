import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { events } from 'src/environments/events';
import { IWsMessage } from './websockets/websocket.interfaces';
import { WebsocketService } from './websockets/websocket.service';

@Injectable({
    providedIn: 'root'
})

export class DataManagerService {
    public tasks = new Subject<any>();
    public createdTask = new Subject<any>();
    public deletedTask = new Subject<any>();
    public taskInfo = new Subject<any>();
    public priorities = new Subject<any>();
    public statuses = new Subject<any>();
    public users = new Subject<any>();
    public user = new Subject<any>();
    public regError = new Subject<any>();
    public logError = new Subject<any>();
    public updatedTaskStatus = new Subject<any>();

    constructor() { }
}
