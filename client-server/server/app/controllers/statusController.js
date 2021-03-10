import { Status } from "../models/db/status.js";
import { DbController } from "./dbController.js";

export class StatusController extends DbController {
    async getStatuses() {
        return await this.getList(Status, {});
    }
}