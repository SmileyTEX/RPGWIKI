import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { AuthService } from '../../services/auth.service';

const METODOS_COM_TOKEN = new Set(['GET', 'PUT', 'POST', 'DELETE']);

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const deveAnexarToken =
    METODOS_COM_TOKEN.has(req.method) && !req.url.includes('/api/auth/login/');

  const token = authService.obterToken();

  const requisicao =
    deveAnexarToken && token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
      : req;

  return next(requisicao).pipe(
    catchError((erro) => {
      if (erro.status === 401 && !req.url.includes('/api/auth/login/')) {
        authService.logout();
        router.navigate(['/login']);
      }

      return throwError(() => erro);
    })
  );
};
