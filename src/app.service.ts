import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  //TODO add dragon dto
  private dragons = [
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
  processFight(fighter1: any, fighter2: any) {
    const dragon1 = this.dragons.find((dragon) => dragon.id === fighter1.id);
    const dragon2 = this.dragons.find((dragon) => dragon.id === fighter2.id);
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
    } else if (fighter2NewHealth < 1) {
      fighter2NewHealth = 0;
      result = 'win1';
      message = `${dragon1.name} wins! Anothre round?`;
    }

    return {
      fighter1: { newHealth: fighter1NewHealth, damage: dragon2.strength },
      fighter2: { newHealth: fighter2NewHealth, damage: dragon1.strength },
      result,
      message,
    };
  }
}
