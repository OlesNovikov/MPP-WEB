import { DbConnector } from '../configurations/dbConnector.js';
import { Response, send } from '../models/response.js';

export class RequestService {
    constructor() {}

    validate(request) {
        return [];
    }

    action(request, response, next) {
        return new Response({ message: "ok" });
    }

    async process(request, response, next) {
        try {
            console.log(1);
            await DbConnector.connect();
            let validateErrors = this.validate(request).filter(error => error);
            if (validateErrors.length !== 0) {
                console.log(validateErrors);
                send(response, new Response({ message: validateErrors, status: 400 }));
            }

            console.log(2);
            send(response, this.action(request, response, next));
            console.log(3);
            await DbConnector.disconnect();
            console.log(4);
        }
        catch(error) {
            console.log(`Process error, ${error}`);
            send(response, new Response({ message: error, status: 500 }));
        }
    }
}