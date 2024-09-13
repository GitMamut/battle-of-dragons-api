import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DragonDto } from './dtos/dragon.dto';
import { FighterDto } from './dtos/fight-request.dto';
import { FightResponseDto } from './dtos/fight-response.dto';

@Injectable()
export class AppService {
  private dragons: DragonDto[] = [
    { id: 0, name: 'Elliot', strength: 21, size: 2, type: 'Air' },
    { id: 1, name: 'Fafnir', strength: 28, size: 5, type: 'Fire' },
    { id: 2, name: 'Nidhogg', strength: 25, size: 4, type: 'Earth' },
    { id: 3, name: 'Jormungandr', strength: 30, size: 5, type: 'Water' },
    { id: 4, name: 'Glaedr', strength: 22, size: 3, type: 'Air' },
    { id: 5, name: 'Saphira', strength: 27, size: 4, type: 'Fire' },
    { id: 6, name: 'Thorn', strength: 24, size: 3, type: 'Earth' },
    { id: 7, name: 'Skoll', strength: 26, size: 4, type: 'Fire' },
    { id: 8, name: 'Hati', strength: 23, size: 3, type: 'Water' },
    { id: 9, name: 'Fenrir', strength: 29, size: 5, type: 'Earth' },
  ];

  private dragonWins = [];

  getHello(): string {
    return 'BATTLE OF DRAGONS!';
  }

  getDragons() {
    return this.dragons;
  }

  fight(input) {
    const { fighter1, fighter2 } = input;
    const fightResult = this.processFight(fighter1, fighter2);
    return fightResult;
  }

  //TODO add fancy calculations based on dragon attributes and previous fights
  //TODO this could use some refactoring
  processFight(fighter1: FighterDto, fighter2: FighterDto): FightResponseDto {
    const dragon1 = this.dragons.find((dragon) => dragon.id === fighter1.id);
    const dragon2 = this.dragons.find((dragon) => dragon.id === fighter2.id);

    if (!dragon1 || !dragon2) {
      const allowedIds = this.dragons.map((dragon) => dragon.id).join(', ');
      throw new HttpException(
        `Dragon not found among the dragons! Please use fighter id from this set: [${allowedIds}]`,
        HttpStatus.BAD_REQUEST,
      );
    }

    let fighter1NewHealth = fighter1.health - dragon2.strength;
    let fighter2NewHealth = fighter2.health - dragon1.strength;

    let result = 'continue';
    let message = 'Continue the fight!';
    if (fighter1NewHealth < 1 && fighter2NewHealth < 1) {
      fighter1NewHealth = 0;
      fighter2NewHealth = 0;
      result = 'draw';
      message = 'Both dragons are dead! Wanna try again?';
    } else if (fighter1NewHealth < 1) {
      fighter1NewHealth = 0;
      result = 'win2';
      message = `${dragon2.name} wins! Another round?`;

      // that is a first idea of how I would store historical results
      this.dragonWins.push({ winnerId: dragon2.id, loserId: dragon1.id });
    } else if (fighter2NewHealth < 1) {
      fighter2NewHealth = 0;
      result = 'win1';
      message = `${dragon1.name} wins! Anothre round?`;

      // that is a first idea of how I would store historical results
      this.dragonWins.push({ winnerId: dragon2.id, loserId: dragon1.id });
    }

    return {
      fighter1: { newHealth: fighter1NewHealth, damage: dragon2.strength },
      fighter2: { newHealth: fighter2NewHealth, damage: dragon1.strength },
      result,
      message,
    };
  }
}
