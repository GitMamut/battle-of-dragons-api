import { IsInt, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class FighterDto {
  @IsInt()
  @Min(0)
  id: number;

  @IsInt()
  @Min(0)
  health: number;
}

export class FightRequestDto {
  @ValidateNested()
  @Type(() => FighterDto)
  fighter1: FighterDto;

  @ValidateNested()
  @Type(() => FighterDto)
  fighter2: FighterDto;
}
