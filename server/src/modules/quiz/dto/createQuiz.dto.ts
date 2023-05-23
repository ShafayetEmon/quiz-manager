import { IsNotEmpty, Length } from "class-validator";

export class createQuizDto{
  @IsNotEmpty({message: 'The Quiz should have a title'})
  @Length(3, 255)
  title: string;

  @IsNotEmpty()
  @Length(3)
  description: string;
}