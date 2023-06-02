import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ResponseService {
  @OnEvent('response.submitted')
  checkQuizCompleted(payload) {
    console.log('checkQuizCompleted', payload);
  }
}
