import { RequestService } from "../requestService.js";
import { TaskController } from "../../controllers/taskController.js";
import { Response } from "../../models/response.js";

export class TasksListService extends RequestService {
    async action(request, response, next) {
        return new Response(await new TaskController().getTasks());
    }
}