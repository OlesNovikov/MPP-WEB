export class Request {
    event: any;
    params: any;
    token: any;
    body: any;

    constructor(event: any, params: any, token: any, body: any) {
        this.event = event;
        this.params = params;
        this.token = token;
        this.body = body;
    }
}