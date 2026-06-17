import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
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
export class PersonagemListarComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly service = inject(PersonagemService);

  personagens = signal<Personagem[]>([]);
  carregando = signal(false);
  erro = signal<string | null>(null);

  ngOnInit() {
    this.carregar();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.urlAfterRedirects === '/personagens') {
          this.carregar();
        }
      });
  }

  carregar() {
    this.carregando.set(true);
    this.erro.set(null);

    this.service.listar().subscribe({
      next: (personagens) => {
        this.personagens.set(personagens);
        this.carregando.set(false);
      },
      error: () => {
        this.personagens.set([]);
        this.carregando.set(false);
        this.erro.set('Não foi possível carregar os personagens. Verifique se o backend está rodando.');
      }
    });
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
    this.erro.set(null);
    this.service.remover(id).subscribe({
      next: () => this.carregar(),
      error: () => {
        this.erro.set('Não foi possível remover o personagem. Verifique se o backend está rodando.');
      }
    });
  }

  onStatusAlterado(personagem: Personagem) {
    this.erro.set(null);
    this.service.atualizar(personagem).subscribe({
      next: () => this.carregar(),
      error: () => {
        this.erro.set('Não foi possível atualizar o status. Verifique se o backend está rodando.');
        this.carregar();
      }
    });
  }
}
