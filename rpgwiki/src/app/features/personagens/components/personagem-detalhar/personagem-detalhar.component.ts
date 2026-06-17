import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { Personagem, IMAGEM_PERSONAGEM_PADRAO } from '../../../../models/personagem';
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
  carregando = signal(true);
  imagemPadrao = IMAGEM_PERSONAGEM_PADRAO;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarPersonagem(id);
  }

  private carregarPersonagem(id: number) {
    this.carregando.set(true);

    this.service.obterPorId(id).subscribe({
      next: (encontrado) => {
        this.personagem.set(encontrado);
        this.carregando.set(false);
      },
      error: () => {
        this.carregando.set(false);
        this.router.navigate(['/personagens']);
      }
    });
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

  usarImagemPadrao(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.imagemPadrao;
  }
}
