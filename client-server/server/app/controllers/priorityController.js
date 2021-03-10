import { Priority } from "../models/db/priority.js";
import { DbController } from "./dbController.js";

export class PriorityController extends DbController {
    async getPriorities() {
        return await this.getList(Priority, {});
    }
}