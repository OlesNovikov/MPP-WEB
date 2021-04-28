import { DbConnector } from '../configurations/dbConnector.js';
import { getDecodedToken, getMe } from '../configurations/tokens.js';
import { UserController } from '../controllers/userController.js';
import { Response, send } from '../models/response.js';
import { WsMessage } from '../../websockets/wsResponse.js';

export class RequestService {
    constructor() {}

    validate(request) {
        return [];
    }

    async action(params, token, body) {
        return new Response({ message: "ok" });
    }

    async process(request, response, next, isTokenRequired = true) {
        try {
            await DbConnector.connect();
            let validateErrors = this.validate(request).filter(error => error);
            if (validateErrors.length !== 0) {
                console.log(`validate() error: ${ validateErrors }`);
                send(response, new Response({ message: validateErrors, status: 400 }));
                return;
            }
            const currentUser = await this.authorisedUser(request, isTokenRequired);
            if (!currentUser) {
                send(response, new Response({ message: ['Unauthorized access'], status: 401 }));
                return;
            }
             
            send(response, await this.action(request, response, next, currentUser));
        }
        catch(error) {
            console.log(`process() error: ${ error }`);
            send(response, new Response({ message: error, status: 500 }));
        }
    }

    async processWs(params = null, token, body, isTokenRequired = true) {
        try {
            await DbConnector.connect();

            let validateErrors = this.validate(body).filter(error => error);
            if (validateErrors.length !== 0) {
                console.log(`validate() error: ${ validateErrors }`);
                return JSON.stringify(new WsMessage("message", new Response({ data: validateErrors, status: 400 })));
            }

            const currentUser = await this.authorisedUserWs(token, isTokenRequired);
            if (!currentUser) {
                return JSON.stringify(new WsMessage("message", new Response({ data: ['Unauthorized access'], status: 401 })));
            }

            return JSON.stringify(new WsMessage("message", await this.action(params, token, body)));
        }
        catch(error) {
            console.log(`process() error: ${ error }`);
            return JSON.stringify(new WsMessage("message", new Response({ data: error, status: 500 })));
        }
    }

    async authorisedUserWs(token, isTokenRequired) {
        if (!isTokenRequired) {
            return true;
        }

        const data = getMe(token);
        return token ? await new UserController().readUser(data[0] || data) : null;
    }

    async authorisedUser(request, isTokenRequired) {
        if (!isTokenRequired) {
            return true;
        }

        const token = request.headers.authorization;
        const data = getMe(token);
        return token ? await new UserController().readUser(data[0] || data) : null;
    }
}