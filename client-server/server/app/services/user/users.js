import { events } from "../../configurations/events.js";
import { UserController } from "../../controllers/userController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class UsersListService extends RequestService {
    async action() {
        return new Response({ event: events.getUsers, data: await new UserController().getUsers()});
    }
}