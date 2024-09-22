import { Module } from '@nestjs/common';
import { FightController } from './fight.controller';
import { FightService } from './fight.service';
import { DragonsModule } from 'src/dragons/dragons.module';
import { HistoryModule } from 'src/history/history.module';

@Module({
  imports: [DragonsModule, HistoryModule],
  providers: [FightService],
  controllers: [FightController],
})
export class FightModule {}
