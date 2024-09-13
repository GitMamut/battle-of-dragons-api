import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //TODO add typing for response
  @Get('dragons')
  getDragons() {
    return this.appService.getDragons();
  }

  //TODO add input validation with request DTO
  //TODO add typing for response
  @Post('fight')
  fight(@Body() input: any) {
    return this.appService.fight(input);
  }
}
