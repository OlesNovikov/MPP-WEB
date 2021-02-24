export class DbController {
    async create(instance, model) {
        return await instance.create(model);
    }

    async findOrCreate(instance, model) {
        return await instance.findOrCreate(model);
    }

    async read(instance, model) {
        return await instance.findOne(model);
    }

    async update(instance, model, instanceId) {
        return await instance.update(model, instanceId);
    }

    async delete(instance, id) {
        const entity = await instance.findOne(id);
        return entity === null ? null : await entity.destroy();
    }

    async getList(instance, model) {
        return await instance.findAll(model);
    }
}