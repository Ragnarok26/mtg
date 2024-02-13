import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    if (token !== null && token !== 'null') {
      const tokenDetails = JSON.parse(token!);
      const expireAt = new Date(tokenDetails.expireAt);
      const currentDate = new Date();
      if (currentDate >= expireAt) {
        localStorage.setItem('token', null!);
      } else {
        const authReq = req.clone({
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenDetails.token}`
          })
        });
        return next.handle(authReq);
      }
    }
    return next.handle(req);
  }
}
