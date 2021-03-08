import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpRequestService {

constructor(private httpClient: HttpClient) { }

public get(url: string): Observable<any> {
    return this.httpClient.get(environment.URL + url);
}

public post(url: string, body: Object): Observable<any> {
    return this.httpClient.post(environment.URL + url, body);
}

public put(url: string, body: Object):Observable<any> {
    return this.httpClient.put(environment.URL + url, body);
}

public delete(url: string): Observable<any> {
    return this.httpClient.delete(environment.URL + url);
}

}