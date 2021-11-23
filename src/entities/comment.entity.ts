import { ArticleEntity } from 'src/entities/article.entity';
import { UserEntity } from './user.entity';
import { Entity, OneToMany, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { classToPlainFromExist } from 'class-transformer';

@Entity('comments')
export class CommentEntity extends AbstractEntity {
  @Column()
  body: string;

  @ManyToOne((type) => UserEntity, (user) => user.comments, { eager: true })
  author: UserEntity;

  @ManyToOne((type) => ArticleEntity, (article) => article.comments)
  article: ArticleEntity;

  toJSON() {
    const { body, author } = this;
    return { body, author };
  }
}
