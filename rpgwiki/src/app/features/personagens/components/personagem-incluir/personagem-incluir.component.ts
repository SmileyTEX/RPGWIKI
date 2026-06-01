import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, FormField, required, min, maxLength, pattern } from '@angular/forms/signals';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

import { PersonagemPayload, criarPersonagemVazio } from '../../../../models/personagem';
import { TIPOS_PERSONAGEM } from '../../../../models/tipo-personagem';

@Component({
  selector: 'app-personagem-incluir',
  standalone: true,
  imports: [FormsModule, FormField, InputTextModule, ButtonModule, SelectModule],
  templateUrl: './personagem-incluir.component.html'
})
export class PersonagemIncluirComponent {
  salvar = output<PersonagemPayload>();
  cancelar = output<void>();

  tiposPersonagem = TIPOS_PERSONAGEM;

  model = signal<PersonagemPayload>(criarPersonagemVazio());

  personagemForm = form(this.model, (p) => {
    required(p.nome, { message: 'Informe o nome do personagem' });
    maxLength(p.nome, 80, { message: 'Máximo de 80 caracteres' });
    required(p.nivel, { message: 'Informe o nível do personagem' });
    required(p.classe, { message: 'Informe a classe do personagem' });
    required(p.tipo, { message: 'Informe o tipo do personagem' });
    required(p.raca, { message: 'Informe a raça do personagem' });
    required(p.alinhamento, { message: 'Informe o alinhamento do personagem' });
    required(p.idade, { message: 'Informe a idade do personagem' });
    required(p.local, { message: 'Informe a origem/local do personagem' });
    required(p.faccao, { message: 'Informe a facção do personagem' });
    required(p.campanha, { message: 'Informe a campanha do personagem' });
    required(p.antecedente, { message: 'Informe o antecedente do personagem' });
    required(p.descricao, { message: 'Informe a descrição do personagem' });
    required(p.imagem, { message: 'Informe a URL da imagem' });
    pattern(p.imagem, /^(https?:\/\/.*)$/, { message: 'Informe uma URL válida' });
    min(p.nivel, 1, { message: 'O nível deve ser no mínimo 1' });
    min(p.idade, 1, { message: 'A idade deve ser no mínimo 1' });
  });

  onSalvar() {
    if (this.personagemForm().invalid()) {
      this.personagemForm().markAsTouched();
      return;
    }
    this.salvar.emit(this.model());
  }

  alterarStatusAtivo(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.model.update((v) => ({ ...v, ativo: checked }));
  }

  alterarTipo(valor: PersonagemPayload['tipo']) {
    this.model.update((v) => ({ ...v, tipo: valor }));
  }

}
