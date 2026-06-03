import { Personagem } from './personagem';

export interface PersonagemRouteState {
  personagem: Personagem;
  origem?: 'listar' | 'detalhar';
}

export function lerPersonagemDoState(): Personagem | undefined {
  const state = history.state as Partial<PersonagemRouteState> | undefined;
  return state?.personagem;
}

export function lerOrigemDoState(): NonNullable<PersonagemRouteState['origem']> {
  const state = history.state as Partial<PersonagemRouteState> | undefined;
  return state?.origem === 'detalhar' ? 'detalhar' : 'listar';
}
