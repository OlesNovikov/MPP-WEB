import { TaskController } from "../../controllers/taskController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class CreateTaskService extends RequestService {
    async action(request, response, next) {
        const model = {
            title: request.title,
            status_id: request.status_id,
            description: request.description,
            deadline: request.deadline,
            filename: request.filename,
            author_id: request.author_id,
            executor_id: request.executor_id,
            priority_id: request.priority_id
        };
        const createdTask = await new TaskController().createTask(model);
        return new Response(createdTask.dataValues);
    }
}