import getJWTToken from "../../configurations/tokens.js";
import { Validator } from "../../configurations/validator.js";
import { UserController } from "../../controllers/userController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class RegistrationService extends RequestService {
    validate(request) {
        const passMinLength = 4;
        const passMaxLength = 16;
        const body = request;
        const validator = new Validator();
        return [
            validator.validateEmail(body.email), 
            validator.validateLength('password', body.password, passMinLength, passMaxLength)
        ];
    }

    async action(request, response, next) {
        const model = request;
        const users = await new UserController().registrate(model);
        return users[1] ? new Response({ user: users[0], token: getJWTToken(users) }) 
                        : new Response({ message: [`User with email ${ model.email } already exists`], status: 400 });
    }
}