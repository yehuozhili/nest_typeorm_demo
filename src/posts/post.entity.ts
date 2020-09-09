import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeepPartial,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

@Entity({ name: 'posts' })
export class Posts {
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
    name: 'title',
    comment: '标题',
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'content',
    comment: '内容',
  })
  content: string;

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

  @ManyToOne(
    () => UserEntity,
    user => user.posts,
  )
  user: UserEntity;
}

export type PostsType = DeepPartial<Posts>;
