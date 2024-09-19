import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    // console.log('Token: ', token);
    const handledRequest = token
      ? request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)})
      : request;
    return next.handle(handledRequest);
  }
}
