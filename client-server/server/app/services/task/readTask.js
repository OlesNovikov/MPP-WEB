import { events } from "../../configurations/events.js";
import { TaskController } from "../../controllers/taskController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class ReadTaskService extends RequestService {
    async action(params, token, body) {
        const taskInfo = await new TaskController().readTask(params.id);
        return taskInfo != null ? new Response({ event: events.getTask, data: taskInfo }) :
            new Response({ event: events.getTask, message: "Task not found", status: 404 });
    }
}