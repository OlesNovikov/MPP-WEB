import { DbController } from "./dbController.js";
import { User } from '../models/db/user.js'

export class UserController extends DbController{
    constructor() {
        super();
    }

    async registrate(model) {
        //console.log(model);
        let result = await this.create(User, model);
        return result;
    }
}