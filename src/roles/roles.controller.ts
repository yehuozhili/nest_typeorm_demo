import { Controller, Post, Body, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesTypes, Roles } from './roles.entity';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';
import { UserEntityDataType } from 'src/user/user.entity';

export type RoleCreateDataType = {
  user: UserEntityDataType;
  role: RolesTypes;
};

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}
  @Post()
  @Transaction()
  async createUser(
    @Body()
    data: RoleCreateDataType,
    @TransactionManager() manager: EntityManager,
  ): Promise<string> {
    return await this.roleService.create(data, manager);
  }

  @Get()
  async userList(): Promise<Roles[]> {
    return await this.roleService.getList();
  }
}
