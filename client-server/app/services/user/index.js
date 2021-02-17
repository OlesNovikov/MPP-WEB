import { RegistrationService } from "./registration.js";
import { LoginService } from "./login.js";
import { CreateTaskService } from "../task/crudTaskService.js";

export const userServices = {
    registration: new RegistrationService(),
    login: new LoginService()
};

export const taskServices = {
    create: new CreateTaskService()
}