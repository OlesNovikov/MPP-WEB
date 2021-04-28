import { events } from "../../configurations/events.js";
import { TaskController } from "../../controllers/taskController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class DeleteTaskService extends RequestService {
    async action(params, token, body) {
        const result = await new TaskController().deleteTask(params.id);
        return result ? new Response({ event: events.deleteTask, data: result }) :
                        new Response({ event: events.deleteTask, data: "Not found", status: 404 });
        // if (result) {
        //     const tasks = await new TaskController().getTasks();
        //     return new Response({ event: events.getTasks, data: tasks });
        // }
        
        // return new Response({ event: events.deleteTask, message: "Not found", status: 404 });
    }
}