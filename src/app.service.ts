import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DragonDto } from './dtos/dragon.dto';
import { FighterDto } from './dtos/fight-request.dto';
import { FightResponseDto } from './dtos/fight-response.dto';

@Injectable()
export class AppService {
  private dragonWins = [];

  getHello(): string {
    return 'BATTLE OF DRAGONS!';
  }
}
