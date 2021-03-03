import { TaskController } from "../../controllers/taskController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class UpdateTaskService extends RequestService {
    async action(request) {
        const result = await new TaskController().updateTask(request);
        return result[0] === 0 ? new Response({ message: "Not found", status: 404 }) 
                            : new Response({ message: "Task updated successfully", status: 200 });
    }
}