import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterPayload } from './auth/register-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: String = 'http://localhost:8080/';

  constructor(private httpclient: HttpClient) {}

  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpclient.post(this.url + 'signup', registerPayload);
    // registerPayload se va trimite catre [BE]
    // metoda returneaza Observable-ul
  }
}
