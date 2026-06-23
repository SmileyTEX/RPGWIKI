import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { LoginRequest, LoginResponse, TOKEN_STORAGE_KEY } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly loginUrl = '/api/auth/login/';

  readonly autenticado = signal(this.possuiToken());

  login(credenciais: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, credenciais).pipe(
      tap((resposta) => {
        localStorage.setItem(TOKEN_STORAGE_KEY, resposta.access);
        this.autenticado.set(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    this.autenticado.set(false);
  }

  obterToken(): string | null {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }

  possuiToken(): boolean {
    return !!this.obterToken();
  }
}
