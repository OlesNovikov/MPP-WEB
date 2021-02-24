import { RegistrationService } from "./registration.js";
import { LoginService } from "./login.js";
import { CreateTaskService } from "../task/createTask.js";
import { ReadTaskService } from "../task/readTask.js";
import { UpdateTaskService } from "../task/updateTask.js";
import { DeleteTaskService } from "../task/deleteTask.js";
import { UsersService } from "./users.js";

export const userServices = {
    registration: new RegistrationService(),
    login: new LoginService(),
    getList: new UsersService()
};

export const taskServices = {
    create: new CreateTaskService(),
    read: new ReadTaskService(),
    update: new UpdateTaskService(),
    delete: new DeleteTaskService()
}