import { events } from "../../configurations/events.js";
import { TaskController } from "../../controllers/taskController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class UpdateTaskService extends RequestService {
    async action(params, token, body) {
        const result = await new TaskController().updateTask(params.id, body);
        return result[0] != 0 ? new Response({ event: events.updateTask, data: "Task updated successfully" }) :
                                new Response({ event: events.updateTask, data: "Not found", status: 404 })  
    }
}