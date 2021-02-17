import { DbController } from "./dbController.js";
import { User } from '../models/db/user.js'

export class UserController extends DbController{
    constructor() {
        super();
    }

    async registrate(model) {
        return await this.create(User, model);
    }

    async logIn(model) {
        return await this.read(User, model);
    }
}