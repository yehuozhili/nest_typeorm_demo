import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './roles.entity';
import { Repository, EntityManager } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { RoleCreateDataType } from './roles.controller';
import { isArray } from 'util';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly roleRepository: Repository<Roles>,
  ) {}

  async create(
    data: RoleCreateDataType,
    manager: EntityManager,
  ): Promise<string> {
    const roles = new Roles();
    roles.name = data.role.name;
    const user = await manager
      .getRepository(UserEntity)
      .findOne(data.user.id, { relations: ['roles'] });
    console.log(user.roles);
    //找到的user里加入role
    if (isArray(user.roles)) {
      user.roles.push(roles);
    } else {
      user.roles = [roles];
    }

    roles.users = [user];
    console.log(user);
    await manager.save(user);

    await manager.save(roles);
    return 'ok';
  }

  async getList(): Promise<Roles[]> {
    return await this.roleRepository.find();
  }
}
