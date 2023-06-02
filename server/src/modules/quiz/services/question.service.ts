import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createQuestionDto } from "../dto/create-question.dto";
import { Question } from "../entities/question.entity";
import { Quiz } from "../entities/quiz.entity";



@Injectable()
export class QuestionService{
  constructor(
    @InjectRepository(Question) private questionRepository: Repository<Question>,
  ){}
  
  async findQuestionById(id: number): Promise<Question>{
    return await this.questionRepository.findOne({
      where: {id},
      relations:['quiz', 'options'],
    });
  }

  async createQuestion(question: createQuestionDto, quiz: Quiz): Promise<Question>{
    const newQuestion =  await this.questionRepository.save({
      question: question.question
    });
    quiz.questions = [...quiz.questions, newQuestion]
    await quiz.save();
    return newQuestion;
  }
}