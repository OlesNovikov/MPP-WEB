export class DbController {
    constructor() {}

    async create(instance, model) {
        let result = await instance.findOrCreate(
            {
                where: 
                {
                    nickname: model.nickname, 
                    email: model.email, 
                    password: model.password
                }
            });

        return result[0]._options.isNewRecord;
    }

    async read(instance, model) {
        const users = await instance.findAll({
            where: {
                email: model.email
            }
        });

        return users[0];
    }

    async update() {}

    async delete() {}

    async getList(instance, model) {}
}