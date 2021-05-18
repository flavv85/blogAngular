import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { LoginPayload } from '../login-payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginPayload: LoginPayload;

  constructor(private authService: AuthService, private router: Router) {
    // injectam Router ca sa putem naviga catre o pagina (Home), dupa un successfull login
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
    // intializam loginPayload ca sa nu primim eroare cand incercam sa trimim values din form control
    this.loginPayload = {
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {}

  // submit the form to do the login
  onSubmit() {
    //extracted user si pass prin login form; ca sa le trimite trimitem catre BE , trebuie sa la encasulam intr-un obiect si trimis catre authService sa faca call-ul, vom crea clasa LoginPayload, similar cu RegisterPayload
    this.loginPayload.username = this.loginForm.get('username').value;
    this.loginPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginPayload).subscribe((data) => {
      if (data) {
        console.log('Logare cu success');
        this.router.navigateByUrl('/home');
      } else {
        console.log('Procesul de logare a esuat');
      }
    });
  }
}
