import { Provider } from '@nestjs/common';
import { EventEmitter } from 'events';

export const EventEmitterProvider: Provider = {
  provide: 'EVENT_EMITTER',
  useValue: new EventEmitter(),
};
