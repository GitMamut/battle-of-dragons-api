import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FightModule } from './fight/fight.module';
import { DragonsModule } from './dragons/dragons.module';

@Module({
  imports: [FightModule, DragonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
