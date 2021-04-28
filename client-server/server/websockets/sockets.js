import { events } from '../app/configurations/events.js';
import { priorityServices, statusSerivces, taskServices, userServices } from '../app/services/index.js';
import { webSocketServer } from '../index.js';

export const connectWs = async () => {
    webSocketServer.on('connection', ws => {
        console.log('Connection established');

        ws.on(events.message, async event => {
            const dataObj = JSON.parse(event);
            const data = dataObj.data;

            console.log('request from client: ', event);

            switch (data.event) {
                // POST /registration
                case events.registration:
                    ws.send(await userServices.registration.processWs(data.params, data.token, data.body, false));
                    break;

                // POST /login
                case events.login:
                    ws.send(await userServices.login.processWs(data.params, data.token, data.body, false));
                    break;

                // GET /users
                case events.getUsers:
                    ws.send(await userServices.getList.processWs(data.params, data.token, data.body));
                    break;

                // GET /user
                case events.getUser:
                    ws.send(await userServices.read.processWs(data.params, data.token, data.body));
                    break;

                // GET /tasks
                case events.getTasks:
                    sendToClients(await taskServices.getList.processWs(data.params, data.token, data.body));
                    break;

                // POST /tasks/create
                case events.createTask:
                    sendToClients(await taskServices.create.processWs(data.params, data.token, data.body));
                    break;

                // GET /tasks/:id
                case events.getTask:
                    ws.send(await taskServices.read.processWs(data.params, data.token, data.body));
                    break;
                
                // DELETE /tasks/:id
                case events.deleteTask:
                    sendToClients(await taskServices.delete.processWs(data.params, data.token, data.body));
                    break;

                // PUT /tasks/:id
                case events.updateTask:
                    sendToClients(await taskServices.update.processWs(data.params, data.token, data.body));
                    break;

                // GET /statuses
                case events.getStatuses:
                    ws.send(await statusSerivces.getList.processWs(data.params, data.token, data.body));
                    break;

                // GET /priorities
                case events.getPriorities:
                    ws.send(await priorityServices.getList.processWs(data.params, data.token, data.body));
                    break;

                default: 
                    ws.send(JSON.stringify('Can\'t recognize request'));
            }
        })
    })
}

function sendToClients(data) {
    webSocketServer.clients.forEach(client => {
        client.send(data);
    });
}