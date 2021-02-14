import { DbConnector } from '../configurations/dbConnector.js';
import { Response, send } from '../models/response.js';

export class RequestService {
    constructor() {}

    validate(request) {
        return [];
    }

    async action(request, response, next) {
        return new Response({ message: "ok" });
    }

    async process(request, response, next) {
        try {
            await DbConnector.connect();
            let validateErrors = this.validate(request).filter(error => error);
            if (validateErrors.length !== 0) {
                console.log(`Validate error, ${validateErrors}`);
                send(response, new Response({ message: validateErrors, status: 400 }));
            }

            //console.log("response before: ", response.body);
            let result = await this.action(request, response, next);
            console.log(result);
            send(response, result);
            await DbConnector.disconnect();
        }
        catch(error) {
            console.log(error);
            send(response, new Response({ message: error, status: 500 }));
        }
    }
}