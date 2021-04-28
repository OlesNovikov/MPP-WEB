import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

export class DownloadFileService extends RequestService {
    async action(request, response, next) {
        const file = 'uploads/' + request.params.filename;
        response.download(file);

        return new Response({ status: 200, message: "ok" });
    }
}