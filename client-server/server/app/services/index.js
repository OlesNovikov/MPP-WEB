import { RegistrationService } from "./user/registration.js";
import { LoginService } from "./user/login.js";
import { UsersListService } from "./user/users.js";
import { CreateTaskService } from "./task/createTask.js";
import { ReadTaskService } from "./task/readTask.js";
import { UpdateTaskService } from "./task/updateTask.js";
import { DeleteTaskService } from "./task/deleteTask.js";
import { TasksListService } from "./task/tasks.js";
import { StatusesListService } from "./status/statuses.js";
import { PrioritiesListService } from "./priority/priorities.js";

export const userServices = {
    registration: new RegistrationService(),
    login: new LoginService(),
    getList: new UsersListService()
};

export const taskServices = {
    create: new CreateTaskService(),
    read: new ReadTaskService(),
    update: new UpdateTaskService(),
    delete: new DeleteTaskService(),
    getList: new TasksListService()
}

export const statusSerivces = {
    getList: new StatusesListService(),
}

export const priorityServices = {
    getList: new PrioritiesListService(),
}