import { TagEntity } from './../entities/tag.entity';
import { CommentEntity } from './../entities/comment.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from './../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleEntity } from 'src/entities/article.entity';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleEntity,
      UserEntity,
      CommentEntity,
      TagEntity,
    ]),
    AuthModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService, CommentsService],
})
export class ArticleModule {}
