import { events } from "../../configurations/events.js";
import { TaskController } from "../../controllers/taskController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class CreateTaskService extends RequestService {
    async action(params, token, body) {
        const task = await new TaskController().createTask(body);
        return task ? new Response({ event: events.createTask, data: task }):
                    new Response({ event: events.createTask, data: 'Task is not created', status: 404 });
    }
}