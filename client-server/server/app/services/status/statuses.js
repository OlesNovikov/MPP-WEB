import { events } from '../../configurations/events.js';
import { StatusController } from '../../controllers/statusController.js'
import { Response } from '../../models/response.js';
import { RequestService } from '../requestService.js';

export class StatusesListService extends RequestService {
    async action(request, response, next) {
        return new Response({ event: events.getStatuses, data: await new StatusController().getStatuses() });
    }
}