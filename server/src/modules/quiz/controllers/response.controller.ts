import { Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';

@Controller('/response')
@ApiTags('Response')
export class ResonseController {
  constructor(private eventEmitter: EventEmitter2) {}
  @Post('')
  async handleQuestionResponse() {
    this.eventEmitter.emit('response.submitted', {
      userId: 1,
      optionId: 4,
    });
    return { message: 'Response taken' };
  }
}
