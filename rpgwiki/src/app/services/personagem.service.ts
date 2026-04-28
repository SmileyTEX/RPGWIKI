import { Injectable } from '@angular/core';
import { Personagem } from '../models/personagem';

@Injectable({
  providedIn: 'root'
})
export class PersonagemService {

  private personagens: Personagem[] = [
    { id: 1, nome: 'Arthas', nivel: 10, ativo: true },
    { id: 2, nome: 'Merlin', nivel: 20, ativo: false }
  ];

  private nextId = 3;

  listar(): Personagem[] {
    return this.personagens;
  }

  buscarPorId(id: number): Personagem | undefined {
    return this.personagens.find(p => p.id === id);
  }

  adicionar(personagem: Omit<Personagem, 'id'>) {
    this.personagens.push({ ...personagem, id: this.nextId++ });
  }

  atualizar(personagem: Personagem) {
    const index = this.personagens.findIndex(p => p.id === personagem.id);
    if (index !== -1) {
      this.personagens[index] = personagem;
    }
  }

  remover(id: number) {
    this.personagens = this.personagens.filter(p => p.id !== id);
  }
}