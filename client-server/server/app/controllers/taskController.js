import associations from '../models/index.js';
const { User, Task, Status, Priority } = associations;
import { DbController } from "./dbController.js";

export class TaskController extends DbController {
    async createTask(model) {
        return await this.create(Task, model);
    }

    async readTask(taskId) {
        return await this.read(Task, {
            where: { id: taskId }, 
            include: [
                { model: User, as: "executor" }, 
                { model: User, as: "author" },
                { model: Status, as: "status" },
                { model: Priority, as: "priority" }
            ]
        });
    }

    async updateTask(request) {
        const model = request.body;
        return await this.update(Task, {
            title: model.title,
            description: model.description,
            deadline: model.deadline,
            filename: model.filename,
            status_id: model.status_id,
            author_id: model.author_id,
            executor_id: model.executor_id,
            priority_id: model.priority_id
        }, {
            where: { id: request.params.id }
        });
    }

    async deleteTask(taskId) {
        return await this.delete(Task, taskId);
    }

    async getTasks() {
        return await this.getList(Task, {
            include: [
                    { model: User, as: "executor" },
                    { model: User, as: "author" },
                    { model: Status, as: "status" },
                    { model: Priority, as: "priority" }
                ]
        });
    }
}