import { TaskController } from "../../controllers/taskController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class ReadTaskService extends RequestService {
    async action(request, response, next) {
        const taskInfo = await new TaskController().readTask(request.id);
        const info = taskInfo[0].dataValues;
        const task = {
            id: info.id,
            title: info.title,
            description: info.description,
            deadline: JSON.stringify(info.deadline),
            filename: info.filename,
            status_id: info.status_id,
            priority_id: info.priority_id,
            executor_id: info.executor_id,
            author_id: info.author_id,
            created_at: info.created_at,
            updated_at: info.updated_at
        }
        
        return taskInfo === null ? new Response({ message: "Task not found", status: 404 }) 
                            : new Response(task);
    }
}