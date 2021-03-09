import express, { request, response } from 'express';
import { statusSerivces, taskServices, userServices, priorityServices } from './app/services/index.js';

export const router = express.Router();

router.post("/registration", (request, response, next) => userServices.registration.process(request, response, next, false));
router.post("/login", (request, response, next) => userServices.login.process(request, response, next, false));
router.get("/users", (request, response, next) => userServices.getList.process(request, response, next));
//router.get('/user', (request, response, next) => userServices.getCurrentUser.process(request, response, next));
router.get('/statuses', (request, response, next) => statusSerivces.getList.process(request, response, next));
router.get('/priorities', (request, response, next) => priorityServices.getList.process(request, response, next));

router.get("/tasks", (request, response, next) => taskServices.getList.process(request, response, next));
router.post("/tasks/create", (request, response, next) => taskServices.create.process(request, response, next));
router.get("/tasks/:id", (request, response, next) => taskServices.read.process(request, response, next));
router.delete("/tasks/:id", (request, response, next) => taskServices.delete.process(request, response, next));
router.put("/tasks/:id", (request, response, next) => taskServices.update.process(request, response, next));