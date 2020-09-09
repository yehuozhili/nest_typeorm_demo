import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts, PostsType } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly userRepository: Repository<Posts>,
  ) {}

  async create(data: PostsType): Promise<Posts> {
    return await this.userRepository.save(data);
  }

  async getList(): Promise<Posts[]> {
    return await this.userRepository.find();
  }
}
