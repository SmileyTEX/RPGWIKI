import { Injectable } from '@angular/core';
import { Personagem } from '../models/personagem';

@Injectable({
  providedIn: 'root'
})
export class PersonagemService {

  private personagens: Personagem[] = [];
  private nextId = 1;

  constructor() {
    this.carregarDoLocalStorage();
  }

  
  private carregarDoLocalStorage() {
    const dados = localStorage.getItem('personagens');

    if (dados) {
      this.personagens = JSON.parse(dados);

     
      const maiorId = this.personagens.reduce((max, p) => p.id > max ? p.id : max, 0);
      this.nextId = maiorId + 1;

    } else {
      
      this.personagens = [
        {
          id: 1,
          nome: 'Arthas',
          nivel: 10,
          ativo: true,
          classe: 'Guerreiro',
          descricao: 'Um cavaleiro caído em busca de redenção.',
          imagem: 'https://i.pinimg.com/736x/e0/21/be/e021be95108888de62ab5ac48ccd7a03.jpg'
        }
      ];
      this.nextId = 2;
      this.salvarNoLocalStorage();
    }
  }

  
  private salvarNoLocalStorage() {
    localStorage.setItem('personagens', JSON.stringify(this.personagens));
  }

  listar() {
    return this.personagens;
  }

  adicionar(p: Omit<Personagem, 'id'>) {
    this.personagens.push({ ...p, id: this.nextId++ });
    this.salvarNoLocalStorage(); 
  }

  atualizar(p: Personagem) {
    const i = this.personagens.findIndex(x => x.id === p.id);
    if (i !== -1) {
      this.personagens[i] = p;
      this.salvarNoLocalStorage(); 
    }
  }

  remover(id: number) {
    this.personagens = this.personagens.filter(p => p.id !== id);
    this.salvarNoLocalStorage(); 
  }
}