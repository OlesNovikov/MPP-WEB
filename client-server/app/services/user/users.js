import { UserController } from "../../controllers/userController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class UsersService extends RequestService {
    async action(request, response, next) {
        const users = await new UserController().getUsers();
        return new Response(users);
    }
}