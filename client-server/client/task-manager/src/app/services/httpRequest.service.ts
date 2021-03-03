import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';

@Injectable()
export class HttpRequestService {

constructor(private httpClient: HttpClient) { }

public get(url: string): Observable<any> {
    return this.httpClient.get(url);
}

public async post(url: string, body: any) {
    let result: Object = {};
    await this.httpClient.post(url, body).toPromise().then((data:any) => {
        result = data.data;
        console.log(data.data);
    });
    return result;
}

public put() {

}

public delete() {
    
}

}