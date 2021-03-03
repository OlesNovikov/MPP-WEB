export class Response {
    constructor(model) {
        this.content = model,
        this.status = model.status || 200;
    }
}

export const send = (response, responseObject) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    response.status(responseObject.status).json(responseObject.content);
};