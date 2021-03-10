import { StatusController } from '../../controllers/statusController.js'
import { Response } from '../../models/response.js';
import { RequestService } from '../requestService.js';

export class StatusesListService extends RequestService {
    async action(request, response, next) {
        return new Response(await new StatusController().getStatuses());
    }
}