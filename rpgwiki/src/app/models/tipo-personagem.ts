export type TipoPersonagem = 'jogador' | 'npc';

export const TIPOS_PERSONAGEM: { label: string; value: TipoPersonagem }[] = [
  { label: 'Jogador', value: 'jogador' },
  { label: 'NPC', value: 'npc' }
];
