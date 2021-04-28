export class Response {
    constructor(model) {
        this.event = model.event,
        this.data = model.data,
        this.status = model.status || 200;
    }
}

export const send = (response, responseObject) => {
    response.status(responseObject.status).json(responseObject.data);
};