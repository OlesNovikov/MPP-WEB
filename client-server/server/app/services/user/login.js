import { events } from '../../configurations/events.js';
import getJWTToken from '../../configurations/tokens.js';
import { getMe } from '../../configurations/tokens.js';
import { Validator } from "../../configurations/validator.js";
import { UserController } from "../../controllers/userController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class LoginService extends RequestService {
    validate(body) {
        const passMinLength = 8;
        const passMaxLength = 16;
        const validator = new Validator();
        return [
            validator.validateEmail(body.email),
            validator.validateLength('password', body.password, passMinLength, passMaxLength),
        ];
    }

    async action(id, token, body) {
        const model = body;
        const result = await new UserController().logIn(model);
        const user = result[0];
        const data = { user: user, token: getJWTToken(user) };
        
        return user ? new Response({ event: events.login, data: data })
                    : new Response({ event: events.login, data: [`Email or password is not valid`], status: 401 });
    }
}