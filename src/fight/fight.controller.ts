import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { FightStartRequestDto } from 'src/dtos/fight-start-request.dt';
import { FightService } from './fight.service';
import { DragonsService } from 'src/dragons/dragons.service';

@Controller('fight')
export class FightController {
  constructor(private readonly fightService: FightService) {}

  @Post('start')
  fight(@Body(new ValidationPipe()) input: FightStartRequestDto) {
    const { fighter1Id, fighter2Id } = input;
    const newFightId = this.fightService.start(fighter1Id, fighter2Id);
    return { newFightId };
  }

  @Post('continue/:fightId')
  continueFight(@Param('fightId') fightId: string) {
    const savedFight = this.fightService.getFight(fightId);
    if (savedFight === undefined) {
      throw new HttpException('Fight not found', HttpStatus.NOT_FOUND);
    }
    const result = this.fightService.continue(fightId, savedFight);
    return result;
  }
}
