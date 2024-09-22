import { Injectable } from '@nestjs/common';
import { DragonsService } from 'src/dragons/dragons.service';
import { DragonDto } from 'src/dtos/dragon.dto';
import { HistoryService } from 'src/history/history.service';
import { FightResult, SavedFight } from 'types/SavedFight.interface';

@Injectable()
export class FightService {
  private readonly fights = new Map<string, SavedFight>();

  constructor(
    private readonly dragonsService: DragonsService,
    private readonly historyService: HistoryService,
  ) {}

  start(fighter1Id: number, fighter2Id: number): string {
    const fightId = crypto.randomUUID();
    this.fights.set(fightId, {
      fighter1: { id: fighter1Id, health: 100 },
      fighter2: { id: fighter2Id, health: 100 },
      result: 'start',
    });
    return fightId;
  }

  getFight(fightId: string): SavedFight {
    return this.fights.get(fightId);
  }

  continue(fightId: string, savedFight: SavedFight) {
    const fighter1 = this.dragonsService.getDragon(savedFight.fighter1.id);
    const fighter2 = this.dragonsService.getDragon(savedFight.fighter2.id);

    const fighter1AttackStrength = calculateAttackStrength(fighter1);
    const fighter2AttackStrength = calculateAttackStrength(fighter2);

    const smallMessages = [
      `-${fighter2AttackStrength}HP ${fighter1.name}`,
      `-${fighter1AttackStrength}HP ${fighter2.name}`,
    ].sort(() => Math.random() - 0.5);

    //TODO add fancy calculations based on dragon attributes and previous fights
    //TODO this could use some refactoring
    const fighter1NewHealth = calculateNewHealth(
      savedFight.fighter1.health,
      fighter2AttackStrength,
    );
    const fighter2NewHealth = calculateNewHealth(
      savedFight.fighter2.health,
      fighter1AttackStrength,
    );

    let result: FightResult = 'continue';
    let message = 'Continue the fight!';
    if (fighter1NewHealth < 1 && fighter2NewHealth < 1) {
      result = 'draw';
      smallMessages.unshift('Both dragons are dead!');
      message = 'Wanna try again?';
    } else if (fighter1NewHealth < 1) {
      result = 'win2';
      smallMessages.unshift(`${fighter2.name} wins the fight!`);
      message = `Another round?`;
    } else if (fighter2NewHealth < 1) {
      result = 'win1';
      smallMessages.unshift(`${fighter1.name} wins the fight!`);
      message = `Another round?`;
    }

    this.fights.set(fightId, {
      fighter1: { id: fighter1.id, health: fighter1NewHealth },
      fighter2: { id: fighter2.id, health: fighter2NewHealth },
      result,
    });

    if (result !== 'continue')
      this.historyService.addFightResult(fighter1.id, fighter2.id, result);

    return {
      fighter1: { newHealth: fighter1NewHealth, damage: fighter2.strength },
      fighter2: { newHealth: fighter2NewHealth, damage: fighter1.strength },
      result,
      smallMessages,
      message,
    };
  }
}

function calculateNewHealth(currentHealth: number, attackStrength: number) {
  return Math.max(0, currentHealth - attackStrength);
}

function calculateAttackStrength(fighter: DragonDto) {
  return Math.floor((Math.random() + 0.5) * fighter.strength);
}
