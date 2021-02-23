import { Task } from "../models/db/task.js";
import { DbController } from "./dbController.js";

export class TaskController extends DbController {
    async createTask(model) {
        return await this.create(Task, model);
    }

    async readTask(taskId) {
        return await this.read(Task, {
            where: { id: taskId }
        });
    }

    async updateTask(request) {
        const model = request.body;
        return await this.update(Task, {
            title: model.title,
            description: model.description,
            deadline: model.deadline,
            status_id: model.status_id,
            author_id: model.author_id,
            executor_id: model.executor_id,
            priority_id: model.priority_id
        }, {
            where: { id: request.params.id }
        });
    }

    async deleteTask(taskId) {
        return await this.delete(Task, {
            where: { id: taskId }
        });
    }

    async getTaskList(model) {
        return await this.getList(Task, model);
    }
}