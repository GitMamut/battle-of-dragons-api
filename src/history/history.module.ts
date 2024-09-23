import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { EventEmitterProvider } from 'src/event-emitter-provider/event-emitter-provider';

@Module({
  providers: [HistoryService, EventEmitterProvider],
  controllers: [HistoryController],
  exports: [HistoryService],
})
export class HistoryModule {}
