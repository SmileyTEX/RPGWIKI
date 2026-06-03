import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { Personagem } from '../../../../models/personagem';
import { lerPersonagemDoState } from '../../../../models/personagem-route-state';
import { PersonagemService } from '../../../../services/personagem.service';

@Component({
  selector: 'app-personagem-detalhar',
  standalone: true,
  imports: [ButtonModule, TagModule],
  templateUrl: './personagem-detalhar.component.html'
})
export class PersonagemDetalharComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(PersonagemService);

  personagem = signal<Personagem | null>(null);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const fromState = lerPersonagemDoState();

    if (fromState?.id === id) {
      this.personagem.set(fromState);
      return;
    }

    const encontrado = this.service.obterPorId(id);
    if (encontrado) {
      this.personagem.set(encontrado);
    } else {
      this.router.navigate(['/personagens']);
    }
  }

  voltar() {
    this.router.navigate(['/personagens']);
  }

  irParaAlterar() {
    const p = this.personagem();
    if (!p) {
      return;
    }
    this.router.navigate(['/personagens', p.id, 'alterar'], {
      state: { personagem: p, origem: 'detalhar' }
    });
  }
}
