import { Controller, Get } from '@nestjs/common';
import { DragonsService } from './dragons.service';

@Controller('dragons')
export class DragonsController {
  constructor(private readonly dragonsService: DragonsService) {}

  @Get()
  getDragons() {
    return this.dragonsService.getDragons();
  }
}
