import { TaskController } from "../../controllers/taskController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class ReadTaskService extends RequestService {
    async action(request, response, next) {
        const taskInfo = await new TaskController().readTask(request.id);
        return taskInfo === null ? new Response({ message: "Task not found", status: 404 }) 
                            : new Response(taskInfo[0].dataValues);
    }
}