// example.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ExampleService } from './example.service';

describe('ExampleService', () => {
  let service: ExampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExampleService],
    }).compile();

    service = module.get<ExampleService>(ExampleService);
  });

  it('should return data', async () => {
    const result = await service.fetchData();

    // Assert the result structure
    expect(result).toEqual({ count: expect.any(Number), status: expect.any(Number) });
  });
});
