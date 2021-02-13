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
        console.log(request.body);
        return new Response(await new UserController().registrate(request.body));
    }
}