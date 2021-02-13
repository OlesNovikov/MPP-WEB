import { Validator } from "../../configurations/validator.js";
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

    action(request, response, next, sequelize) {
        return new Response({ email: request.body.email });
    }
}