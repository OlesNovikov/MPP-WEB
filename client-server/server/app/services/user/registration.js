import { events } from "../../configurations/events.js";
import getJWTToken from "../../configurations/tokens.js";
import { Validator } from "../../configurations/validator.js";
import { UserController } from "../../controllers/userController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class RegistrationService extends RequestService {
    validate(body) {
        const passMinLength = 4;
        const passMaxLength = 16;
        const validator = new Validator();
        return [
            validator.validateEmail(body.email), 
            validator.validateLength('password', body.password, passMinLength, passMaxLength)
        ];
    }

    async action(params, token, body) {
        const model = body;
        const users = await new UserController().registrate(model);
        const isNewUser = users[1];
        const user = users[0];
        const data = { user: user, token: getJWTToken(user)}
        return isNewUser ? new Response({ event: events.registration, data: data }) 
                        : new Response({ event: events.registration, data: [`User with email ${ model.email } already exists`], status: 400 });
    }
}