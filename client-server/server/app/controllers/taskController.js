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

    async updateTask(id, body) {
        return await this.update(Task, {
            title: body.title,
            description: body.description,
            deadline: body.deadline,
            filename: body.filename,
            status_id: body.status_id,
            author_id: body.author_id,
            executor_id: body.executor_id,
            priority_id: body.priority_id
        }, {
            where: { id: id }
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