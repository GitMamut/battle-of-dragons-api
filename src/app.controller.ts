import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { DragonDto } from './dtos/dragon.dto';
import { FightRequestDto } from './dtos/fight-request.dto';
import { FightResponseDto } from './dtos/fight-response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('dragons')
  getDragons(): DragonDto[] {
    return this.appService.getDragons();
  }

  @Post('fight')
  fight(@Body(new ValidationPipe()) input: FightRequestDto): FightResponseDto {
    return this.appService.fight(input);
  }
}
