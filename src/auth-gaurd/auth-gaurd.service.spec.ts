import { Test, TestingModule } from '@nestjs/testing';
import { AuthGaurdService } from './auth-gaurd.service';

describe('AuthGaurdService', () => {
  let service: AuthGaurdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGaurdService],
    }).compile();

    service = module.get<AuthGaurdService>(AuthGaurdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
