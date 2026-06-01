import { Component, signal } from '@angular/core';

import { Personagem, PersonagemPayload } from '../../models/personagem';
import { PersonagemService } from '../../services/personagem.service';
import { PersonagemListarComponent } from './components/personagem-listar/personagem-listar.component';
import { PersonagemDetalharComponent } from './components/personagem-detalhar/personagem-detalhar.component';
import { PersonagemIncluirComponent } from './components/personagem-incluir/personagem-incluir.component';
import { PersonagemAlterarComponent } from './components/personagem-alterar/personagem-alterar.component';

type ViewMode = 'listar' | 'incluir' | 'alterar' | 'detalhar';

@Component({
  selector: 'app-personagens',
  standalone: true,
  imports: [
    PersonagemListarComponent,
    PersonagemDetalharComponent,
    PersonagemIncluirComponent,
    PersonagemAlterarComponent
  ],
  templateUrl: './personagens.component.html'
})
export class PersonagensComponent {
  personagens = signal<Personagem[]>([]);
  viewMode = signal<ViewMode>('listar');
  personagemSelecionado = signal<Personagem | null>(null);
  origemAlteracao = signal<ViewMode>('listar');

  constructor(private service: PersonagemService) {
    this.carregar();
  }

  carregar() {
    this.personagens.set(this.service.listar());
  }

  irParaIncluir() {
    this.viewMode.set('incluir');
  }

  irParaListar() {
    this.viewMode.set('listar');
    this.personagemSelecionado.set(null);
  }

  onDetalhar(personagem: Personagem) {
    this.personagemSelecionado.set(personagem);
    this.viewMode.set('detalhar');
  }

  onEditar(personagem: Personagem) {
    this.origemAlteracao.set(this.viewMode());
    this.personagemSelecionado.set(personagem);
    this.viewMode.set('alterar');
  }

  onRemover(id: number) {
    this.service.remover(id);
    this.carregar();

    if (this.personagemSelecionado()?.id === id) {
      this.irParaListar();
    }
  }

  onStatusAlterado(personagem: Personagem) {
    this.service.atualizar(personagem);
    this.carregar();
  }

  onIncluirSalvar(dados: PersonagemPayload) {
    this.service.adicionar(dados);
    this.carregar();
    this.irParaListar();
  }

  cancelarAlteracao() {
    this.viewMode.set(this.origemAlteracao() === 'detalhar' ? 'detalhar' : 'listar');
  }

  onAlterarSalvar(personagem: Personagem) {
    this.service.atualizar(personagem);
    this.carregar();
    this.personagemSelecionado.set(personagem);
    this.viewMode.set('detalhar');
  }
}
