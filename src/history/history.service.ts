import { Inject, Injectable } from '@nestjs/common';
import EventEmitter from 'events';
import { FightEndedEvent } from 'types/FightEndedEvent.type';

type FighterRanking = {
  fighterId: number;
  wins: number;
  losses: number;
  draws: number;
};

@Injectable()
export class HistoryService {
  private ranking: FighterRanking[] = [];

  constructor(
    @Inject('EVENT_EMITTER') private readonly eventEmitter: EventEmitter,
  ) {
    this.eventEmitter.on('fight-ended', (data: FightEndedEvent) => {
      console.log('fight-ended: ' + JSON.stringify(data));
      this.addFightResult(data.fighter1Id, data.fighter2Id, data.result);
    });
  }

  addFightResult(fighter1Id: number, fighter2Id: number, result: string) {
    [fighter1Id, fighter2Id].forEach((id) => {
      this.ranking.find((fighter) => fighter.fighterId === id) ||
        this.ranking.push({ fighterId: id, wins: 0, losses: 0, draws: 0 });
    });

    if (result === 'draw') {
      this.ranking.find((fighter) => fighter.fighterId === fighter1Id).draws++;
      this.ranking.find((fighter) => fighter.fighterId === fighter2Id).draws++;
    } else if (result === 'win1') {
      this.ranking.find((fighter) => fighter.fighterId === fighter1Id).wins++;
      this.ranking.find((fighter) => fighter.fighterId === fighter2Id).losses++;
    } else if (result === 'win2') {
      this.ranking.find((fighter) => fighter.fighterId === fighter1Id).losses++;
      this.ranking.find((fighter) => fighter.fighterId === fighter2Id).wins++;
    }
  }

  getHistory() {
    return this.ranking;
  }

  getVictoryAdvantage(fighterId: number) {
    const fighter = this.ranking.find(
      (fighter) => fighter.fighterId === fighterId,
    );
    if (!fighter) {
      return 0;
    }
    return fighter.wins / (fighter.wins + fighter.losses + fighter.draws);
  }
}
