import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Personagem } from './models/personagem';
import { PersonagemService } from './services/personagem.service';
import { FormsModule } from '@angular/forms';

//Prime NG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-root',
  imports: [
      FormsModule,       
      InputTextModule,   
      ButtonModule,      
      CheckboxModule,    
      TableModule       
    ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  personagens: Personagem[] = [];

  novo: Personagem = { id: 0, nome: '', nivel: 1, ativo: true };
  editando = false;

  constructor(private service: PersonagemService) {
    this.carregar();
  }

  carregar() {
    this.personagens = this.service.listar();
  }

  salvar() {
    if (this.editando) {
      this.service.atualizar(this.novo);
    } else {
      this.service.adicionar({
        nome: this.novo.nome,
        nivel: this.novo.nivel,
        ativo: this.novo.ativo
      });
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
    this.novo = { id: 0, nome: '', nivel: 1, ativo: true };
    this.editando = false;
  }
}