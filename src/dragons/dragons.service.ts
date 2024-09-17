import { Injectable } from '@nestjs/common';
import { DragonDto } from 'src/dtos/dragon.dto';

@Injectable()
export class DragonsService {
  //TODO move this to a map, and later to database
  private dragons: DragonDto[] = [
    { id: 0, name: 'Elliot', strength: 21, size: 2, type: 'Air' },
    { id: 1, name: 'Fafnir', strength: 28, size: 5, type: 'Fire' },
    { id: 2, name: 'Nidhogg', strength: 25, size: 4, type: 'Earth' },
    { id: 3, name: 'Jormungandr', strength: 30, size: 5, type: 'Water' },
    { id: 4, name: 'Glaedr', strength: 22, size: 3, type: 'Air' },
    { id: 5, name: 'Saphira', strength: 27, size: 4, type: 'Fire' },
    { id: 6, name: 'Thorn', strength: 24, size: 3, type: 'Earth' },
    { id: 7, name: 'Skoll', strength: 26, size: 4, type: 'Fire' },
    { id: 8, name: 'Hati', strength: 23, size: 3, type: 'Water' },
    { id: 9, name: 'Fenrir', strength: 29, size: 5, type: 'Earth' },
  ];

  getDragons() {
    return this.dragons;
  }

  getDragon(id: number): DragonDto {
    return this.dragons.find((dragon) => dragon.id === id);
  }
}
