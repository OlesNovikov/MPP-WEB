import { getMe } from "../../configurations/tokens.js";
import { UserController } from "../../controllers/userController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class CurrentUserService extends RequestService {
    async action(request, response, next) {
        const token = request.headers.authorization;
        const data = getMe(token);
        const user = token ? await new UserController().readUser(data[0] || data) : null;
        return new Response(user);
    }
}