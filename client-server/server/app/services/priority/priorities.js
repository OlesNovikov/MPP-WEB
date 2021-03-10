import { PriorityController } from "../../controllers/priorityController.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class PrioritiesListService extends RequestService {
    async action(request, response, next) {
        return new Response(await new PriorityController().getPriorities());
    }
}