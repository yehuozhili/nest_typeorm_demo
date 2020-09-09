import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeepPartial,
  OneToMany,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { Posts } from 'src/posts/post.entity';
import { Roles } from 'src/roles/roles.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
    unique: true,
    name: 'username',
    comment: '用户名',
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    comment: '密码',
  })
  password: string;

  @Column('tinyint', {
    nullable: false,
    default: () => 0,
    name: 'is_del',
    comment: '是否删除,1表示删除,0表示正常',
  })
  isDel: number;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: '更新时间',
  })
  updateAt: Date;

  @OneToMany(
    () => Posts,
    post => post.user,
  )
  @JoinColumn()
  posts: Posts[];

  @ManyToMany(
    () => Roles,
    role => role.users,
  )
  @JoinColumn()
  roles: Roles[];
}

export type UserEntityDataType = DeepPartial<UserEntity>;
