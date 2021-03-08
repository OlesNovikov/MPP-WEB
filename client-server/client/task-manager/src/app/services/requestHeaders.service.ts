import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes(environment.URL + 'registration') || req.url.includes(environment.URL + 'login')) {
            return next.handle(req);
        }
        
        const token = localStorage.getItem('userToken');
        const request = req.clone({
            headers: req.headers.set('authorization', token || '')
        });

        return next.handle(request);
    }
}