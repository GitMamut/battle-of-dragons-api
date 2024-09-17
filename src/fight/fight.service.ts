import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DragonsService } from 'src/dragons/dragons.service';
import { DragonDto } from 'src/dtos/dragon.dto';
import { FighterDto } from 'src/dtos/fight-request.dto';
import { FightResponseDto } from 'src/dtos/fight-response.dto';
import { FightResult, SavedFight } from 'types/SavedFight.interface';

@Injectable()
export class FightService {
  private readonly fights = new Map<string, SavedFight>();

  constructor(private readonly dragonsService: DragonsService) {
    this.fights.set('1', {
      fighter1: { id: 1, health: 100 },
      fighter2: { id: 2, health: 100 },
      result: 'start',
    });
  }

  start(fighter1Id: number, fighter2Id: number): string {
    const fightId = crypto.randomUUID();
    this.fights.set(fightId, {
      fighter1: { id: fighter1Id, health: 100 },
      fighter2: { id: fighter2Id, health: 100 },
      result: 'start',
    });
    // console.log(this.fights);
    return fightId;
  }

  getFight(fightId: string): SavedFight {
    return this.fights.get(fightId);
  }

  continue(fightId: string, savedFight: SavedFight) {
    const fighter1 = this.dragonsService.getDragon(savedFight.fighter1.id);
    const fighter2 = this.dragonsService.getDragon(savedFight.fighter2.id);

    //TODO add fancy calculations based on dragon attributes and previous fights
    //TODO this could use some refactoring
    let fighter1NewHealth = savedFight.fighter1.health - fighter2.strength;
    let fighter2NewHealth = savedFight.fighter2.health - fighter1.strength;

    let result: FightResult = 'continue';
    let message = 'Continue the fight!';
    if (fighter1NewHealth < 1 && fighter2NewHealth < 1) {
      fighter1NewHealth = 0;
      fighter2NewHealth = 0;
      result = 'draw';
      message = 'Both dragons are dead! Wanna try again?';
    } else if (fighter1NewHealth < 1) {
      fighter1NewHealth = 0;
      result = 'win2';
      message = `${fighter2.name} wins! Another round?`;
    } else if (fighter2NewHealth < 1) {
      fighter2NewHealth = 0;
      result = 'win1';
      message = `${fighter1.name} wins! Another round?`;
    }

    console.log(this.fights);

    this.fights.set(fightId, {
      fighter1: { id: fighter1.id, health: fighter1NewHealth },
      fighter2: { id: fighter2.id, health: fighter2NewHealth },
      result,
    });

    return {
      fighter1: { newHealth: fighter1NewHealth, damage: fighter2.strength },
      fighter2: { newHealth: fighter2NewHealth, damage: fighter1.strength },
      result,
      message,
    };
  }
}
