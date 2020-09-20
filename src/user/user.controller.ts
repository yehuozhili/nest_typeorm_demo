import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { UserEntity, UserEntityDataType } from './user.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateUserTdo } from './dto/create.user.dto';
import { plainToClass } from 'class-transformer';
@Controller('user')
export class UserController {
  constructor(
    private configService: ConfigService,
    private readonly userService: UserService,
  ) {
    // get an environment variable
    const dbUser = this.configService.get<string>('DB_TYPE');
    // get a custom configuration value
    const dbHost = this.configService.get<string>('DB_PORT');
    console.log(dbUser, dbHost);
  }
  @Post()
  async createUser(@Body() data: CreateUserTdo): Promise<UserEntity> {
    const data2 = await this.userService.createUser(data);
    const ret = plainToClass(UserEntity, data2);
    return ret;
  }
  // @UseGuards(AuthGuard)
  @Get()
  async userList(): Promise<UserEntity[]> {
    return await this.userService.userList();
  }

  @Put()
  async changePassw(@Body() data: UserEntityDataType) {
    if (data.id !== undefined && data.password !== undefined) {
      //这里还应该看user里有没有这个id的，省略了，没有id会报错
      return await this.userService.changePassword(data.id, data.password);
    } else {
      return 'you need to pass id and password';
    }
  }

  @Delete()
  async delUser(@Body() data: UserEntityDataType) {
    return this.userService.delUser(data.id);
  }
}
