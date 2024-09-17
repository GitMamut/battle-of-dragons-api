import { Module } from '@nestjs/common';
import { FightController } from './fight.controller';
import { FightService } from './fight.service';
import { DragonsService } from 'src/dragons/dragons.service';
import { DragonsModule } from 'src/dragons/dragons.module';

@Module({
  imports: [DragonsModule],
  providers: [FightService, DragonsService],
  controllers: [FightController],
})
export class FightModule {}
