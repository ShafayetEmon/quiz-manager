import { Body, Controller,Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { createQuizDto } from '../dto/createQuiz.dto';
import { QuizService } from '../services/quiz.service';
import { Quiz } from '../entities/quiz.entity';

@Controller('quiz')
export class QuizController {
  constructor (private quizService: QuizService){}
  @Get('/')
  getAllQuiz(){
    return this.quizService.getAllQuiz();
  }

  @Get('/:id')
  async getQuizById(@Param('id', ParseIntPipe) id:number): Promise<Quiz>{
    return await this.quizService.getQuizById(id);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  async createQuiz(@Body() quizData: createQuizDto){
    return await this.quizService.createNewQuiz(quizData);
  }
  
}
