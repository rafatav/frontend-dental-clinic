import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formFields: FormGroup;
  errorMessage: string = '';

  constructor(private router : Router, private authService: AuthService) {
    this.formFields = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    if (this.formFields.invalid) {
      this.errorMessage = 'Preencha o e-mail e a senha corretamente';
      return;
    }

    const { email, password } = this.formFields.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login efetuado com sucesso', response);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erro de autenticação', err);
        this.errorMessage = 'E-mail ou senha incorretos';
      }
    });
  }
}
