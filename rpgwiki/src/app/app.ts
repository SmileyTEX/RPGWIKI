import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { ButtonModule } from 'primeng/button';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.html'
})
export class App {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  private readonly urlAtual = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  readonly estaNaLogin = computed(() => this.urlAtual()?.startsWith('/login') ?? false);
  readonly autenticado = this.authService.autenticado;

  sair() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
