import { Test, TestingModule } from '@nestjs/testing';
import { CasualService } from './casual.service';

describe('CasualService', () => {
  let service: CasualService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CasualService],
    }).compile();

    service = module.get<CasualService>(CasualService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
