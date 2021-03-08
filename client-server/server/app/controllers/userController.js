import { DbController } from "./dbController.js";
import { User } from '../models/db/user.js'

export class UserController extends DbController {
    async registrate(model) {
        return await this.findOrCreate(User, {
            where: { email: model.email },
            defaults: model,
        });
    }

    async logIn(model) {
        return await this.read(User, {
            where: { email: model.email, password: model.password },
            default: model,
        });
    }

    async readUser(model) {
        return await this.read(User, {
            where: { email: model.email }
        });
    }

    async getUsers() {
        return await this.getList(User, {});
    }
}