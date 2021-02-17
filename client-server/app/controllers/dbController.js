export class DbController {
    constructor() {}

    async create(instance, model) {
        return await instance.create(model);
    }

    async findOrCreate(instance, model) {
        return await instance.findOrCreate(model);
    }

    async read(instance, model) {
        return await instance.findAll(model)[0];
    }

    async update(instance, model) {
        return await instance.update(model);
    }

    async delete(instance, model) {
        return await instance.destroy(model);
    }

    async getList(instance, model) {
        return await instance.findAll(model);
    }
}