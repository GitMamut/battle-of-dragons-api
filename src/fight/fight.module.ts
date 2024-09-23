import { Module } from '@nestjs/common';
import { FightController } from './fight.controller';
import { FightService } from './fight.service';
import { DragonsModule } from 'src/dragons/dragons.module';
import { HistoryModule } from 'src/history/history.module';
import { EventEmitterProvider } from 'src/event-emitter-provider/event-emitter-provider';

@Module({
  imports: [DragonsModule, HistoryModule],
  providers: [FightService, EventEmitterProvider],
  controllers: [FightController],
})
export class FightModule {}
