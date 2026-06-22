import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { PersonagemListarComponent } from './features/personagens/components/personagem-listar/personagem-listar.component';
import { PersonagemDetalharComponent } from './features/personagens/components/personagem-detalhar/personagem-detalhar.component';
import { PersonagemIncluirComponent } from './features/personagens/components/personagem-incluir/personagem-incluir.component';
import { PersonagemAlterarComponent } from './features/personagens/components/personagem-alterar/personagem-alterar.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'personagens', pathMatch: 'full' },
  { path: 'personagens', component: PersonagemListarComponent, canActivate: [authGuard] },
  { path: 'personagens/incluir', component: PersonagemIncluirComponent, canActivate: [authGuard] },
  { path: 'personagens/:id/detalhar', component: PersonagemDetalharComponent, canActivate: [authGuard] },
  { path: 'personagens/:id/alterar', component: PersonagemAlterarComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'personagens' }
];
