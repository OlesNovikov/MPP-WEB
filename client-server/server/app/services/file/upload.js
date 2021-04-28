import multer from "multer";
import { events } from "../../configurations/events.js";
import { Response } from "../../models/response.js";
import { RequestService } from "../requestService.js";

const storageFolder = "uploads";

export const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, storageFolder);
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

export class UploadFileService extends RequestService {
    async action(request, response, next) {
        return new Response({ event: events.uploadFile, data: 'file uploaded' });
    }
}