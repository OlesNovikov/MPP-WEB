import { TaskController } from "../../controllers/taskController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class ReadTaskService extends RequestService {
    async action(request, response, next) {
        const taskInfo = await new TaskController().readTask(request.params.id);
        return taskInfo === null ? new Response({ message: "Not found", status: 404 }) 
                            : new Response(taskInfo);
    }
}