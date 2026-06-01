import { Injectable } from '@angular/core';
import { Personagem, PersonagemPayload, criarPersonagemVazio } from '../models/personagem';

@Injectable({
  providedIn: 'root'
})
export class PersonagemService {
  private personagens: Personagem[] = [];
  private nextId = 1;

  constructor() {
    this.carregarDoLocalStorage();
  }

  private normalizarPersonagem(p: Partial<Personagem>): Personagem {
    const base = criarPersonagemVazio();
    return {
      ...base,
      ...p,
      id: p.id ?? 0,
      idade: p.idade ?? null
    };
  }

  private carregarDoLocalStorage() {
    const dados = localStorage.getItem('personagens');

    if (dados) {
      const parsed: Partial<Personagem>[] = JSON.parse(dados);
      this.personagens = parsed.map((p) => this.normalizarPersonagem(p));
      const maiorId = this.personagens.reduce((max, p) => (p.id > max ? p.id : max), 0);
      this.nextId = maiorId + 1;
      this.salvarNoLocalStorage();
    } else {
      this.personagens = [
        this.normalizarPersonagem({
          id: 1,
          nome: 'Arthas',
          nivel: 10,
          ativo: true,
          classe: 'Paladino / Death Knight',
          descricao:
            'Príncipe herdeiro de Lordaeron, Arthas foi corrompido pela runa lâmina Frostmourne e tornou-se o Lich King. Um dos antagonistas mais icônicos do universo Warcraft.',
          imagem: 'https://i.pinimg.com/736x/e0/21/be/e021be95108888de62ab5ac48ccd7a03.jpg',
          tipo: 'jogador',
          raca: 'Humano',
          alinhamento: 'Leal Maligno',
          campanha: 'Warcraft: Queda de Lordaeron',
          antecedente: 'Cavaleiro da Ordem da Prata',
          local: 'Lordaeron',
          faccao: 'Culto dos Malditos',
          idade: 24
        })
      ];
      this.nextId = 2;
      this.salvarNoLocalStorage();
    }
  }

  private salvarNoLocalStorage() {
    localStorage.setItem('personagens', JSON.stringify(this.personagens));
  }

  listar(): Personagem[] {
    return [...this.personagens];
  }

  obterPorId(id: number): Personagem | undefined {
    return this.personagens.find((p) => p.id === id);
  }

  adicionar(p: PersonagemPayload) {
    this.personagens.push({ ...p, id: this.nextId++ });
    this.salvarNoLocalStorage();
  }

  atualizar(p: Personagem) {
    const i = this.personagens.findIndex((x) => x.id === p.id);
    if (i !== -1) {
      this.personagens[i] = p;
      this.salvarNoLocalStorage();
    }
  }

  remover(id: number) {
    this.personagens = this.personagens.filter((p) => p.id !== id);
    this.salvarNoLocalStorage();
  }
}
