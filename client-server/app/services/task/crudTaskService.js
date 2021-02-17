import { TaskController } from "../../controllers/taskController.js";
import { RequestService } from "../requestService.js";

export class CreateTaskService extends RequestService {
    validate(request) {
        return [];
    }

    async action(request, response, next) {
        const model = request.body;
        const task = await new TaskController().createTask(model);
        //console.log("task", task);
        return new Response(task);
    }
}