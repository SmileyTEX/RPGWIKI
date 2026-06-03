import { Routes } from '@angular/router';

import { PersonagemListarComponent } from './features/personagens/components/personagem-listar/personagem-listar.component';
import { PersonagemDetalharComponent } from './features/personagens/components/personagem-detalhar/personagem-detalhar.component';
import { PersonagemIncluirComponent } from './features/personagens/components/personagem-incluir/personagem-incluir.component';
import { PersonagemAlterarComponent } from './features/personagens/components/personagem-alterar/personagem-alterar.component';

export const routes: Routes = [
  { path: '', redirectTo: 'personagens', pathMatch: 'full' },
  { path: 'personagens', component: PersonagemListarComponent },
  { path: 'personagens/incluir', component: PersonagemIncluirComponent },
  { path: 'personagens/:id/detalhar', component: PersonagemDetalharComponent },
  { path: 'personagens/:id/alterar', component: PersonagemAlterarComponent },
  { path: '**', redirectTo: 'personagens' }
];
