import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { form, FormField, required } from '@angular/forms/signals';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { LoginRequest } from '../../../models/auth';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FormField, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styles: [`:host { display: block; width: 100%; max-width: 28rem; }`]
})
export class LoginComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  autenticando = signal(false);
  erro = signal<string | null>(null);

  model = signal<LoginRequest>({ username: '', password: '' });

  loginForm = form(this.model, (credenciais) => {
    required(credenciais.username, { message: 'Informe o nome de usuário' });
    required(credenciais.password, { message: 'Informe a senha' });
  });

  ngOnInit() {
    if (this.authService.possuiToken()) {
      this.router.navigate(['/personagens']);
    }
  }

  onEntrar() {
    if (this.autenticando()) {
      return;
    }

    if (this.loginForm().invalid()) {
      this.loginForm().markAsTouched();
      this.erro.set('Preencha usuário e senha para continuar.');
      return;
    }

    this.autenticando.set(true);
    this.erro.set(null);

    this.authService.login(this.model()).subscribe({
      next: () => {
        this.autenticando.set(false);
        this.router.navigate(['/personagens']);
      },
      error: () => {
        this.autenticando.set(false);
        this.erro.set('Usuário ou senha inválidos.');
      }
    });
  }
}
