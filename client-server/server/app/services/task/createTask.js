import { TaskController } from "../../controllers/taskController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class CreateTaskService extends RequestService {
    async action(request, response, next) {
        const createdTask = await new TaskController().createTask(request);
        return new Response(createdTask.dataValues);
    }
}