export class FighterResultDto {
  newHealth: number;
  damage: number;
}

export class FightResponseDto {
  fighter1: FighterResultDto;
  fighter2: FighterResultDto;
  result: string;
  message: string;
}
