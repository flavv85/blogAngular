import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { RegisterPayload } from '../register-payload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // create formGrup
  registerForm: FormGroup;
  registerPayload: RegisterPayload;

  // initializam formGrup in componenta Register, injectand in constructor
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    this.registerPayload = {
      username: '',
      password: '',
      email: '',
      confirmedPassword: '',
    };
  }

  ngOnInit(): void {}

  onSubmit() {
    this.registerPayload.username = this.registerForm.get('username').value;
    this.registerPayload.email = this.registerForm.get('email').value;
    this.registerPayload.password = this.registerForm.get('password').value;
    this.registerPayload.confirmedPassword = this.registerForm.get(
      'confirmedPassword'
    ).value;
    // folosim Observable, apelam.subscribe
    this.authService.register(this.registerPayload).subscribe(
      (data) => {
        console.log('register succesful');
      },
      (error) => {
        console.log('registration failed');
      }
    );
  }
}
