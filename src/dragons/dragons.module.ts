import { Module } from '@nestjs/common';
import { DragonsService } from './dragons.service';
import { DragonsController } from './dragons.controller';
import { FightModule } from 'src/fight/fight.module';

@Module({
  controllers: [DragonsController],
  providers: [DragonsService],
  exports: [DragonsService],
})
export class DragonsModule {}
