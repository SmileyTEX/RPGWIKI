import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { Personagem } from '../../../../models/personagem';
import { PersonagemCardComponent } from '../personagem-card/personagem-card.component';

@Component({
  selector: 'app-personagem-listar',
  standalone: true,
  imports: [ButtonModule, PersonagemCardComponent],
  templateUrl: './personagem-listar.component.html'
})
export class PersonagemListarComponent {
  personagens = input.required<Personagem[]>();

  incluir = output<void>();
  detalhar = output<Personagem>();
  editar = output<Personagem>();
  remover = output<number>();
  statusAlterado = output<Personagem>();
}
