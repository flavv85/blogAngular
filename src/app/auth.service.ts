import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegisterPayload } from './auth/register-payload';
import { Observable } from 'rxjs';
import { LoginPayload } from './auth/login-payload';
import { JwtAutResponse } from './auth/jwt-aut-response';
import { LocalStorageService } from 'ngx-webstorage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: String = 'http://localhost:8080/api/auth/';

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  public register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.url + 'signup', registerPayload);
    // registerPayload se va trimite catre [BE]
    // metoda returneaza Observable-ul
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient
      .post<JwtAutResponse>(this.url + 'login', loginPayload)
      .pipe(
        map((data) => {
          this.localStorageService.store(
            'authenticationToken',
            data.authenticationToken
          );
          this.localStorageService.store('username', data.username);
          return true;
        })
      );
  }
}
