import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity, UserEntityDataType } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(data: UserEntityDataType): Promise<UserEntity> {
    console.log('createuser');
    return await this.userRepository.save(data);
  }

  async userList(): Promise<UserEntity[]> {
    return await this.userRepository.find({ relations: ['roles'] });
  }

  async changePassword(id: number, newPassword: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    user.password = newPassword;
    return await this.userRepository.save(user);
  }

  async delUser(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    return await this.userRepository.remove(user);
  }
}
