import { UserEntity } from './user.entity';
import { BeforeInsert, Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import * as slugify from 'slug';

@Entity('articles')
export class ArticleEntity extends AbstractEntity {
  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  body: string;

  @ManyToOne((type) => UserEntity, (user) => user.favorites, { eager: true })
  @JoinColumn()
  favoritedBy: UserEntity[];

  //   @RelationCount((article: ArticleEntity) => article.favoritedBy)
  //   favoriteCount: number;

  @ManyToOne((type) => UserEntity, (user) => user.articles, { eager: true })
  author: UserEntity;

  @Column('simple-array')
  tagList: string[];

  @BeforeInsert()
  generateSlug() {
    this.slug =
      slugify(this.title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }

  toJSON() {
    const {
      slug,
      title,
      description,
      body,
      favoritedBy,
      //   favoriteCount,
      author,
    } = this;
    return {
      slug,
      title,
      description,
      body,
      favoritedBy,
      //   favoriteCount,
      author,
    };
  }

  toArticle(user: UserEntity) {
    let favorited = null;
    if (user) {
      favorited = this.favoritedBy.includes(user);
    }
    const article: any = this.toJSON();
    delete article.favoritedBy;
    return { ...article, favorited };
  }
}
