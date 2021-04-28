import { RequestService } from "../requestService.js";
import { TaskController } from "../../controllers/taskController.js";
import { Response } from "../../models/response.js";
import { events } from "../../configurations/events.js";

export class TasksListService extends RequestService {
    async action() {
        return new Response({ event: events.getTasks, data: await new TaskController().getTasks() });
    }
}