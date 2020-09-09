import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  DeepPartial,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
    nullable: false,
    unique: true,
    comment: 'role名称',
  })
  name: string;

  @ManyToMany(
    () => UserEntity,
    user => user.roles,
  )
  @JoinTable({ name: 'role_user' })
  @JoinColumn()
  users: UserEntity[];
}
export type RolesTypes = DeepPartial<Roles>;
