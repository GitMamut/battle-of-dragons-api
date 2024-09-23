import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitterProvider } from './event-emitter-provider';

describe('EventEmitterProvider', () => {
  let provider: EventEmitterProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventEmitterProvider],
    }).compile();

    provider = module.get<EventEmitterProvider>(EventEmitterProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
