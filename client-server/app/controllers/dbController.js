export class DbController {
    constructor() {}

    async create(instance, model) {
        //console.log(await instance.create(model));
        //console.log("model to create: ", model);
        //console.log("instance: ", instance);
        return await instance.create(model);
    }

    async read() {}

    async update() {}

    async delete() {}

    async getList() {}
}