export class Response {
    constructor(model) {
        this.content = model,
        this.status = model.status || 200;
    }
}

export const send = (response, responseObject) => {
    //console.log("This is responseObject", responseObject.content);
    response.status(responseObject.status).json(responseObject.content);
};