import { Component } from '@angular/core';
import { Personagem } from './models/personagem';
import { PersonagemService } from './services/personagem.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//Prime NG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    CardModule
  ],
  templateUrl: './app.html'
})
export class App {

  personagens: Personagem[] = [];

  novo: Personagem = {
    id: 0,
    nome: '',
    nivel: 1,
    ativo: true,
    classe: '',
    descricao: '',
    imagem: ''
  };

  editando = false;

  constructor(private service: PersonagemService) {
    this.carregar();
  }

  carregar() {
    this.personagens = [...this.service.listar()];
  }

  salvar() {
    if (this.editando) {
      this.service.atualizar(this.novo);
    } else {
      this.service.adicionar({ ...this.novo });
    }

    this.resetar();
    this.carregar();
  }

  editar(p: Personagem) {
    this.novo = { ...p };
    this.editando = true;
  }

  remover(id: number) {
    this.service.remover(id);
    this.carregar();
  }

  resetar() {
    this.novo = {
      id: 0,
      nome: '',
      nivel: 1,
      ativo: true,
      classe: '',
      descricao: '',
      imagem: ''
    };
    this.editando = false;
  }
}