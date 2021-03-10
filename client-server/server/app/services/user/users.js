import { UserController } from "../../controllers/userController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class UsersListService extends RequestService {
    async action(request, response, next) {
        return new Response(await new UserController().getUsers());
    }
}