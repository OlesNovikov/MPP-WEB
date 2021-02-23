import { DbController } from "./dbController.js";
import { User } from '../models/db/user.js'

export class UserController extends DbController {
    async registrate(model) {
        return await this.findOrCreate(User, {
            where: 
            {
                nickname: model.nickname, 
                email: model.email,
            },
            defaults: model,
        });
    }

    async logIn(model) {
        return await this.getList(User, {
            where: {
                email: model.email
            }
        });
    }
}