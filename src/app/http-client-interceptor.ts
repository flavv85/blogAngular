// add JWT to the header inainte a face orice http call catre server -> interceptam toate outgoing request din aplicatie si adaugam JWT to auth header (folosim interfata HttpInteceptor)

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  constructor(private $localStorage: LocalStorageService) {}

  intercept(
    // accesam obiectul httprequest, care-l trimitem catre server
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // prima data facem retrieve auth token din localStorage, daca este valid clonam request object si setam auth header cu bearer token-ul
    const token = this.$localStorage.retrieve('authenticationToken');
    console.log('jwt token ' + token);
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      // forward la request care va fi trimis catre server
      return next.handle(cloned);
    } else {
      // daca token nu este valid, il forward asa cum este, fara a adauga ceva
      return next.handle(req);
    }
  }
}
