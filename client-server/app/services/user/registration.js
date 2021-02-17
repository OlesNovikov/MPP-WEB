import { Validator } from "../../configurations/validator.js";
import { UserController } from "../../controllers/userController.js";
import { User } from "../../models/db/user.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class RegistrationService extends RequestService {
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
        const isNewUser = await new UserController().registrate(model);
        return isNewUser ? new Response({ nickname: model.nickname, email: model.email }) 
                        : new Response({ message: `User with email ${model.email} already exists`, status: 401 });
    }
}