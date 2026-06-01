import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

import { Personagem } from '../../../../models/personagem';

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

  onStatusChange(ativo: boolean) {
    this.statusAlterado.emit({ ...this.personagem(), ativo });
  }
}
