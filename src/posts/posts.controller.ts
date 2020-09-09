import { Controller, Body, Post, Get } from '@nestjs/common';
import { PostsType, Posts } from './post.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
  @Post()
  async createUser(@Body() data: PostsType): Promise<Posts> {
    return await this.postService.create(data);
  }

  @Get()
  async userList(): Promise<Posts[]> {
    return await this.postService.getList();
  }
}
