import { TaskController } from "../../controllers/taskController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class DeleteTaskService extends RequestService {
    async action(request, response, next) {
        const result = await new TaskController().deleteTask(request.params.id);
        return result === null ? new Response({ message: "Not found", status: 404 }) 
                            : new Response(result);
    }
}