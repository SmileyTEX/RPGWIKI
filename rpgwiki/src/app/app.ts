import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, FormField, required, min, maxLength, pattern } from '@angular/forms/signals';

import { Personagem } from './models/personagem';
import { PersonagemService } from './services/personagem.service';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormField,
    InputTextModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './app.html'
})
export class App {
  personagens: Personagem[] = [];
  editando = false;
  personagemEditandoId: number | null = null;

  model = signal<Omit<Personagem, 'id'>>({
    nome: '',
    nivel: 1,
    ativo: true,
    classe: '',
    descricao: '',
    imagem: ''
  });

  personagemForm = form(this.model, (p) => {
  required(p.nome, { message: 'Informe o nome do personagem' });
  maxLength(p.nome, 50, { message: 'Máximo de 50 caracteres' });

  required(p.classe, { message: 'Informe a classe do personagem' });

  required(p.descricao, { message: 'Informe a descrição do personagem' });

  required(p.imagem, { message: 'Informe a URL da imagem' });
  pattern(p.imagem, /^(https?:\/\/.*)$/, {
    message: 'Informe uma URL válida'
  });

  min(p.nivel, 1, { message: 'O nível deve ser no mínimo 1' });
});

  constructor(private service: PersonagemService) {
    this.carregar();
  }

  carregar() {
    this.personagens = [...this.service.listar()];
  }

  salvar() {
    if (this.personagemForm().invalid()) {
      this.personagemForm().markAsTouched();
      return;
    }

    const dados = this.model();

    if (this.editando && this.personagemEditandoId !== null) {
      this.service.atualizar({
        id: this.personagemEditandoId,
        ...dados
      });
    } else {
      this.service.adicionar(dados);
    }

    this.resetar();
    this.carregar();
  }

  editar(p: Personagem) {
    this.model.set({
      nome: p.nome,
      nivel: p.nivel,
      ativo: p.ativo,
      classe: p.classe,
      descricao: p.descricao,
      imagem: p.imagem
    });

    this.personagemEditandoId = p.id;
    this.editando = true;
  }

  remover(id: number) {
    this.service.remover(id);
    this.carregar();

    if (this.personagemEditandoId === id) {
      this.resetar();
    }
  }

  resetar() {
    this.model.set({
      nome: '',
      nivel: 1,
      ativo: true,
      classe: '',
      descricao: '',
      imagem: ''
    });

    this.editando = false;
    this.personagemEditandoId = null;
  }

  alterarStatusAtivo(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;

    this.model.update((valorAtual) => ({
      ...valorAtual,
      ativo: checked
    }));
  }
}