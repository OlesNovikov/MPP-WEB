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
        const user = await new UserController().logIn(model);
        return user.length ? new Response(user[0])
                            : new Response({ message: `User with email ${model.email} doesn't exist`, status: 401 });
    }
}