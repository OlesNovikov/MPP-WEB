import { Task } from "../models/db/task.js";
import { DbController } from "./dbController.js";

export class TaskController extends DbController {
    constructor() {
        super();
    }

    async createTask(model) {
        console.log(model);
        return await this.create(Task, {
            title: model.title,
            status_id: model.status,
            author_id: model.author,
            priority_id: model.priority
        });
    }

    async readTask(model) {
        return await this.read(Task, model);
    }

    async updateTask(model) {
        return await this.update(Task, model);
    }

    async deleteTask(model) {
        return await this.delete(Task, model);
    }

    async getTaskList(model) {
        return await this.getList(Task, model);
    }
}