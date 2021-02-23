import express, { request, response } from 'express';
import { taskServices, userServices } from './app/services/user/index.js';

export const router = express.Router();

router.get("/", (request, response, next) => {
    console.log("Hello, Oles");
    
    response.end("<h1>Main page</h1>");
});

router.post("/registration", (request, response, next) => userServices.registration.process(request, response, next));
router.post("/login", (request, response, next) => userServices.login.process(request, response, next));

router.post("/task", (request, response, next) => taskServices.create.process(request, response, next));
router.get("/task/:id", (request, response, next) => taskServices.read.process(request.params.id, response, next));
router.delete("/task/:id", (request, response, next) => taskServices.delete.process(request.params.id, response, next));
router.put("/task/:id", (request, response, next) => taskServices.update.process(request, response, next));