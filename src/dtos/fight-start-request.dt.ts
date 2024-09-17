import { IsInt, Min } from 'class-validator';

export class FightStartRequestDto {
  @IsInt()
  @Min(0)
  fighter1Id: number;

  @IsInt()
  @Min(0)
  fighter2Id: number;
}
