import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { Personagem } from '../../../../models/personagem';
import { PersonagemRouteState } from '../../../../models/personagem-route-state';
import { PersonagemService } from '../../../../services/personagem.service';
import { PersonagemCardComponent } from '../personagem-card/personagem-card.component';

@Component({
  selector: 'app-personagem-listar',
  standalone: true,
  imports: [ButtonModule, PersonagemCardComponent],
  templateUrl: './personagem-listar.component.html'
})
export class PersonagemListarComponent {
  private readonly router = inject(Router);
  private readonly service = inject(PersonagemService);

  personagens = signal<Personagem[]>([]);

  constructor() {
    this.carregar();
  }

  carregar() {
    this.personagens.set(this.service.listar());
  }

  irParaIncluir() {
    this.router.navigate(['/personagens/incluir']);
  }

  navegarParaDetalhar(personagem: Personagem) {
    this.router.navigate(['/personagens', personagem.id, 'detalhar'], {
      state: { personagem } satisfies PersonagemRouteState
    });
  }

  navegarParaAlterar(personagem: Personagem) {
    this.router.navigate(['/personagens', personagem.id, 'alterar'], {
      state: { personagem, origem: 'listar' } satisfies PersonagemRouteState
    });
  }

  onRemover(id: number) {
    this.service.remover(id);
    this.carregar();
  }

  onStatusAlterado(personagem: Personagem) {
    this.service.atualizar(personagem);
    this.carregar();
  }
}
