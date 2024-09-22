import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FightModule } from './fight/fight.module';
import { DragonsModule } from './dragons/dragons.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [FightModule, DragonsModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
