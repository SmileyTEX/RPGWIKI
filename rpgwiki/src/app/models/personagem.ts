import { TipoPersonagem } from './tipo-personagem';

export interface Personagem {
  id: number;
  nome: string;
  nivel: number;
  ativo: boolean;
  classe: string;
  descricao: string;
  imagem: string;
  tipo: TipoPersonagem;
  raca: string;
  alinhamento: string;
  campanha: string;
  antecedente: string;
  local: string;
  faccao: string;
  idade: number | null;
}

export type PersonagemPayload = Omit<Personagem, 'id'>;

export const IMAGEM_PERSONAGEM_PADRAO =
  'https://via.placeholder.com/400x300/16161a/f97316?text=RPG+Wiki';

export function criarPersonagemVazio(): PersonagemPayload {
  return {
    nome: '',
    nivel: 1,
    ativo: true,
    classe: '',
    descricao: '',
    imagem: '',
    tipo: 'jogador',
    raca: '',
    alinhamento: '',
    campanha: '',
    antecedente: '',
    local: '',
    faccao: '',
    idade: null
  };
}

export function normalizarPersonagemPayload(dados: PersonagemPayload): PersonagemPayload {
  const idadeBruta = dados.idade as unknown;
  const idade =
    idadeBruta === null || idadeBruta === undefined || idadeBruta === ''
      ? null
      : Number(idadeBruta);

  return {
    ...dados,
    nivel: Number(dados.nivel) || 1,
    idade: Number.isFinite(idade) ? idade : null
  };
}

export function normalizarPersonagem(dados: Personagem): Personagem {
  return {
    ...normalizarPersonagemPayload(dados),
    id: dados.id
  };
}
