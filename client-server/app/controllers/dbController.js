export class DbController {
    constructor() {}

    async create(instance, model) {
        //console.log(await instance.create(model));
        return await instance.create(model);
    }

    async read() {}

    async update() {}

    async delete() {}

    async getList() {}
}