export interface Fighter {
  id: number;
  health: number;
}

export type FightResult = 'start' | 'continue' | 'win1' | 'win2' | 'draw';

export interface SavedFight {
  fighter1: Fighter;
  fighter2: Fighter;
  result: FightResult;
}
