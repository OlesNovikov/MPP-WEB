import express from 'express';
import { userServices } from './app/services/user/index.js';

export const router = express.Router();

router.get("/", (request, response, next) => {
    console.log("Hello, Oles");
    
    response.end("<h1>Main page</h1>");
});

router.post("/registration", (request, response, next) => userServices.registration.process(request, response, next));
router.post("/login", (request, response, next) => userServices.login.process(request, response, next));