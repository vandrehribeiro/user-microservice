import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  private readonly analytics: any[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: CreateUserEvent) {
    this.analytics.push({
      email: data.email,
      timestamp: new Date()
    })
  }

  getAnalytics() {
    return this.analytics;
  }
}
