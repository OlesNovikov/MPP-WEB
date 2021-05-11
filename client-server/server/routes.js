import express, { request, response } from 'express';
import multer from 'multer';
import { storageConfig } from './app/services/file/upload.js';
import { taskServices, fileService } from './app/services/index.js';
export const router = express.Router();

router.delete("/tasks/:id", (request, response, next) => taskServices.delete.processHttp(request, response, next));
router.put("/tasks/:id", (request, response, next) => taskServices.update.processHttp(request, response, next));
router.post('/file/upload', multer({ storage: storageConfig }).single("file"), (request, response, next) => fileService.upload.processHttp(request, response, next));
router.get('/file/download/:filename', (request, response, next) => fileService.download.processHttp(request, response, next));



