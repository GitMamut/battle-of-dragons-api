import { FightResult } from './SavedFight.interface';

export type FightEndedEvent = {
  fighter1Id: number;
  fighter2Id: number;
  result: FightResult;
};
