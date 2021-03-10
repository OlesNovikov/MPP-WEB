import getJWTToken from '../../configurations/tokens.js';
import { getMe } from '../../configurations/tokens.js';
import { Validator } from "../../configurations/validator.js";
import { UserController } from "../../controllers/userController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class LoginService extends RequestService {
    validate(request) {
        const passMinLength = 8;
        const passMaxLength = 16;
        const body = request.body;
        const validator = new Validator();
        return [
            validator.validateEmail(body.email),
            validator.validateLength('password', body.password, passMinLength, passMaxLength),
        ];
    }

    async action(request, response, next) {
        const model = request.body;
        const result = await new UserController().logIn(model);
        const user = result[0];
        return user ? new Response({ user: user, token: getJWTToken(user) })
                    : new Response({ message: [`Email or password is not valid`], status: 401 });
    }
}