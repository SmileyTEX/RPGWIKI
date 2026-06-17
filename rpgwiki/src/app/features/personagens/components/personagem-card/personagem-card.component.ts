import { Component, input, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

import { Personagem, IMAGEM_PERSONAGEM_PADRAO } from '../../../../models/personagem';

@Component({
  selector: 'app-personagem-card',
  standalone: true,
  imports: [ButtonModule, TagModule, ToggleSwitchModule, FormsModule],
  templateUrl: './personagem-card.component.html'
})
export class PersonagemCardComponent {
  personagem = input.required<Personagem>();

  detalhar = output<Personagem>();
  editar = output<Personagem>();
  remover = output<number>();
  statusAlterado = output<Personagem>();

  imagemPadrao = IMAGEM_PERSONAGEM_PADRAO;
  imagemAtual = signal<string | null>(null);

  imagemExibida(): string {
    if (this.imagemAtual()) {
      return this.imagemAtual()!;
    }

    return this.personagem().imagem || this.imagemPadrao;
  }

  onStatusChange(ativo: boolean) {
    this.statusAlterado.emit({ ...this.personagem(), ativo });
  }

  usarImagemPadrao(event: Event) {
    event.stopPropagation();
    const img = event.target as HTMLImageElement;
    this.imagemAtual.set(this.imagemPadrao);
    img.src = this.imagemPadrao;
  }

  onDetalhar(event: Event) {
    event.stopPropagation();
    this.detalhar.emit(this.personagem());
  }

  onEditar(event: Event) {
    event.stopPropagation();
    this.editar.emit(this.personagem());
  }

  onRemover(event: Event) {
    event.stopPropagation();
    this.remover.emit(this.personagem().id);
  }
}
