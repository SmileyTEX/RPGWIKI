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
