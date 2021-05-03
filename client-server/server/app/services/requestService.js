import { DbConnector } from '../configurations/dbConnector.js';
import { getDecodedToken, getMe } from '../configurations/tokens.js';
import { UserController } from '../controllers/userController.js';
import { Response, send } from '../models/response.js';

export class RequestService {
    constructor() {}

    validate(request) {
        return [];
    }

    async action(request, response, next) {
        return new Response({ message: "ok" });
    }

    async processHttp(request, response, next, isTokenRequired = false) {
        try {
            await DbConnector.connect();
            let validateErrors = this.validate(request).filter(error => error);
            if (validateErrors.length !== 0) {
                console.log(`validate() error: ${ validateErrors }`);
                send(response, new Response({ message: validateErrors, status: 400 }));
                return;
            }
            
            const currentUser = await this.authorisedUserHttp(request, isTokenRequired);
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

    async process(request, response, next, isTokenRequired = true) {
        try {
            await DbConnector.connect();
            let validateErrors = this.validate(request).filter(error => error);
            if (validateErrors.length !== 0) {
                console.log(`validate() error: ${ validateErrors }`);
                return (response, new Response({ message: validateErrors, status: 400 }))
            }
            
            const currentUser = await this.authorisedUser(request, isTokenRequired);
            if (!currentUser) {
                return (response, new Response({ message: ['Unauthorized access'], status: 401 }));
            }
            
            return await this.action(request, response, next, currentUser);
        }
        catch(error) {
            console.log(`process() error: ${ error }`);
            return (response, new Response({ message: error, status: 500 }));
        }
    }

    async authorisedUserHttp(request, isTokenRequired) {
        if (!isTokenRequired) {
            return true;
        }
        
        const token = request.headers.authorization;
        const data = getMe(token);
        return token ? await new UserController().readUser(data[0] || data) : null;
    }

    async authorisedUser(request, isTokenRequired) {
        if (!isTokenRequired) {
            return true;
        }
        
        const token = request.token;
        const data = getMe(token);
        return token ? await new UserController().readUser(data[0] || data) : null;
    }
}