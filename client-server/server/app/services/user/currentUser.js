import { events } from "../../configurations/events.js";
import { getMe } from "../../configurations/tokens.js";
import { UserController } from "../../controllers/userController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class CurrentUserService extends RequestService {
    async action(id, token, body) {
        const data = getMe(token);
        const user = token ? await new UserController().readUser(data[0] || data) : null;
        return new Response({ event: events.getUser, data: user });
    }
}