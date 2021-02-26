import { DbController } from "./dbController.js";
import { User } from '../models/db/user.js'

export class UserController extends DbController {
    async registrate(model) {
        return await this.findOrCreate(User, {
            where: 
            {
                email: model.email,
            },
            defaults: model,
        });
    }

    async logIn(model) {
        return await this.read(User, {
            where: { email: model.email, nickname: model.nickname }
        });
    }

    async readUser(model) {
        return await this.read(User, {
            where: { email: model.email, nickname: model.nickname }
        });
    }

    async getUsers() {
        return await this.getList(User, {});
    }
}