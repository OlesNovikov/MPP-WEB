import { events } from "../../configurations/events.js";
import { PriorityController } from "../../controllers/priorityController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class PrioritiesListService extends RequestService {
    async action(request, response, next) {
        return new Response({ event: events.getPriorities, data: await new PriorityController().getPriorities() });
    }
}