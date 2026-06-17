import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { form, FormField, required, min, maxLength, pattern } from '@angular/forms/signals';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

import {
  Personagem,
  PersonagemPayload,
  criarPersonagemVazio,
  normalizarPersonagemPayload
} from '../../../../models/personagem';
import { lerOrigemDoState } from '../../../../models/personagem-route-state';
import { TIPOS_PERSONAGEM } from '../../../../models/tipo-personagem';
import { PersonagemService } from '../../../../services/personagem.service';

@Component({
  selector: 'app-personagem-alterar',
  standalone: true,
  imports: [FormsModule, FormField, InputTextModule, ButtonModule, SelectModule],
  templateUrl: './personagem-alterar.component.html'
})
export class PersonagemAlterarComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(PersonagemService);

  personagem = signal<Personagem | null>(null);
  carregando = signal(true);
  salvando = signal(false);
  erro = signal<string | null>(null);
  private origem: 'listar' | 'detalhar' = 'listar';

  tiposPersonagem = TIPOS_PERSONAGEM;

  model = signal<PersonagemPayload>(criarPersonagemVazio());

  personagemForm = form(this.model, (p) => {
    required(p.nome, { message: 'Informe o nome do personagem' });
    maxLength(p.nome, 80, { message: 'Máximo de 80 caracteres' });
    required(p.nivel, { message: 'Informe o nível do personagem' });
    required(p.classe, { message: 'Informe a classe do personagem' });
    required(p.tipo, { message: 'Informe o tipo do personagem' });
    required(p.raca, { message: 'Informe a raça do personagem' });
    required(p.alinhamento, { message: 'Informe o alinhamento do personagem' });
    required(p.idade, { message: 'Informe a idade do personagem' });
    required(p.local, { message: 'Informe a origem/local do personagem' });
    required(p.faccao, { message: 'Informe a facção do personagem' });
    required(p.campanha, { message: 'Informe a campanha do personagem' });
    required(p.antecedente, { message: 'Informe o antecedente do personagem' });
    required(p.descricao, { message: 'Informe a descrição do personagem' });
    required(p.imagem, { message: 'Informe a URL da imagem' });
    pattern(p.imagem, /^(https?:\/\/.*)$/, { message: 'Informe uma URL válida' });
    min(p.nivel, 1, { message: 'O nível deve ser no mínimo 1' });
    min(p.idade, 1, { message: 'A idade deve ser no mínimo 1' });
  });

  constructor() {
    effect(() => {
      const p = this.personagem();
      if (!p) {
        return;
      }
      const { id: _, ...dados } = p;
      this.model.set(normalizarPersonagemPayload(dados));
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.origem = lerOrigemDoState();
    this.carregarPersonagem(id);
  }

  private carregarPersonagem(id: number) {
    this.carregando.set(true);
    this.erro.set(null);

    this.service.obterPorId(id).subscribe({
      next: (encontrado) => {
        this.personagem.set(encontrado);
        this.carregando.set(false);
      },
      error: () => {
        this.carregando.set(false);
        this.erro.set('Não foi possível carregar o personagem. Verifique se o backend está rodando.');
        this.router.navigate(['/personagens']);
      }
    });
  }

  onSalvar() {
    const atual = this.personagem();
    if (!atual || this.salvando()) {
      return;
    }

    const payload = normalizarPersonagemPayload(this.model());

    if (this.personagemForm().invalid()) {
      this.personagemForm().markAsTouched();
      this.erro.set('Corrija os campos destacados antes de salvar.');
      return;
    }

    const atualizado: Personagem = { id: atual.id, ...payload };
    this.salvando.set(true);
    this.erro.set(null);

    this.service.atualizar(atualizado).subscribe({
      next: (salvo) => {
        this.salvando.set(false);
        if (this.origem === 'detalhar') {
          this.router.navigate(['/personagens', salvo.id, 'detalhar'], {
            state: { personagem: salvo }
          });
        } else {
          this.router.navigate(['/personagens']);
        }
      },
      error: () => {
        this.salvando.set(false);
        this.erro.set('Não foi possível salvar as alterações. Verifique se o backend está rodando.');
      }
    });
  }

  cancelar() {
    const atual = this.personagem();
    if (!atual) {
      this.router.navigate(['/personagens']);
      return;
    }
    if (this.origem === 'detalhar') {
      this.router.navigate(['/personagens', atual.id, 'detalhar'], {
        state: { personagem: atual }
      });
    } else {
      this.router.navigate(['/personagens']);
    }
  }

  alterarStatusAtivo(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.model.update((v) => ({ ...v, ativo: checked }));
  }

  alterarTipo(valor: PersonagemPayload['tipo']) {
    this.model.update((v) => ({ ...v, tipo: valor }));
  }
}
