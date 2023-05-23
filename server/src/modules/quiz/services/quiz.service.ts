import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createQuizDto } from "../dto/createQuiz.dto";
import { Quiz } from "../entities/quiz.entity";
import { Repository } from "typeorm";


@Injectable()
export class QuizService{
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
  ){}
  getAllQuiz(){
    return[1,2,3,'From service'];
  }

  async getQuizById(id: number): Promise<Quiz>{
    return await this.quizRepository.findOne({
      where: {id},
      relations:['questions'],
    });
  }

  async createNewQuiz(quiz: createQuizDto){
    return await this.quizRepository.save(quiz);
  }
}