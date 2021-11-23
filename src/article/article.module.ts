import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from './../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleEntity } from 'src/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity]), AuthModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
