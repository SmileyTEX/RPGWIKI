import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { Personagem } from '../../../../models/personagem';

@Component({
  selector: 'app-personagem-detalhar',
  standalone: true,
  imports: [ButtonModule, TagModule],
  templateUrl: './personagem-detalhar.component.html'
})
export class PersonagemDetalharComponent {
  personagem = input.required<Personagem>();

  voltar = output<void>();
  editar = output<Personagem>();
}
