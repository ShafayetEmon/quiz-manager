import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createQuizDto } from '../dto/createQuiz.dto';
import { QuizService } from '../services/quiz.service';
import { Quiz } from '../entities/quiz.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}
  @Get('/')
  async getAllQuiz(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Quiz>> {
    limit = limit > 100 ? 100 : limit;
    return await this.quizService.paginate({
      page,
      limit,
    });
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get a quiz by id' })
  async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<Quiz> {
    return await this.quizService.getQuizById(id);
  }

  @Post('/create')
  @ApiCreatedResponse({ description: 'The quiz got created', type: Quiz })
  @UsePipes(ValidationPipe)
  async createQuiz(@Body() quizData: createQuizDto) {
    return await this.quizService.createNewQuiz(quizData);
  }
}
