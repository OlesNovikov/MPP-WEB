import getJWTToken from "../../configurations/tokens.js";
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
            validator.validateLength('password', body.password, passMinLength, passMaxLength)
        ];
    }

    async action(request, response, next) {
        const model = request.body;
        const users = await new UserController().logIn(model);
        const user = users[0];
        return users.length ? new Response({ user, token: getJWTToken(user) })
                            : new Response({ message: `User with email ${model.email} doesn't exist`, status: 401 });
    }
}