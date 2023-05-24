import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRegisterRequestDto } from "./dto/user-register.req.dto";
import { User } from "./user.entity";

@Controller('user')
export class UserController{
  constructor(private userService: UserService){}

  @Post('/register')
  async doUserRegistration(@Body(ValidationPipe) userRegister: UserRegisterRequestDto):Promise<User>{
    return await this.userService.doUserRegistration(userRegister);
  }
}