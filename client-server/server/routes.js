import express, { request, response } from 'express';
import { taskServices, userServices } from './app/services/index.js';

export const router = express.Router();

router.get("/", (request, response, next) => {
    console.log("Hello, Oles");
    
    response.end("<h1>Main page</h1>");
});

router.post("/registration", (request, response, next) => userServices.registration.process(request, response, next, false));
router.post("/login", (request, response, next) => userServices.login.process(request, response, next, false));
router.get("/users", (request, response, next) => userServices.getList.process(request, response, next))

router.post("/tasks/add", (request, response, next) => taskServices.create.process(request, response, next));
router.get("/tasks/:id", (request, response, next) => taskServices.read.process(request, response, next));
router.get("/tasks", (request, response, next) => taskServices.getList.process(request, response, next));
router.delete("/tasks/:id", (request, response, next) => taskServices.delete.process(request, response, next));
router.put("/tasks/:id", (request, response, next) => taskServices.update.process(request, response, next));