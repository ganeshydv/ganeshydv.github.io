// example.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
  async fetchData(): Promise<{ count: number; status: number }> {
    // Some asynchronous logic...
    return { count: 42, status: 200 };
  }
}
