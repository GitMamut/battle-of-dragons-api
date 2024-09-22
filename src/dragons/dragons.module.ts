import { Module } from '@nestjs/common';
import { DragonsService } from './dragons.service';
import { DragonsController } from './dragons.controller';

@Module({
  controllers: [DragonsController],
  providers: [DragonsService],
  exports: [DragonsService],
})
export class DragonsModule {}
