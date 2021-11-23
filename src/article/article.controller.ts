import { OptionalAuthGuard } from './../auth/optional-auth.guard';
import {
  CreateArticleDTO,
  UpdateArticleDTO,
  FindAllQuery,
  FindFeedQuery,
} from './../models/article.model';
import { UserEntity } from './../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { User } from 'src/auth/user.decorator';
import { ValidationPipe } from 'src/shared/validation.pipe';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  @UseGuards(new OptionalAuthGuard())
  async findAll(@User() user: UserEntity, @Query() query: FindAllQuery) {
    const articles = await this.articleService.findAll(user, query);
    return { articles, articlesCount: articles.length };
  }

  @Get('/feed')
  @UseGuards(AuthGuard())
  async findFeed(@User() user: UserEntity, @Query() query: FindFeedQuery) {
    const articles = await this.articleService.findFeed(user, query);
    return { articles, articlesCount: articles.length };
  }

  @Get('/:slug')
  @UseGuards(new OptionalAuthGuard())
  async findBySlug(@Param('slug') slug: string, @User() user: UserEntity) {
    const article = await this.articleService.findBySlug(slug);
    return { article: article.toArticle(user) };
  }

  @Post('/:slug')
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe())
  async createArticle(
    @User() user: UserEntity,
    @Body() data: { article: CreateArticleDTO },
  ) {
    const article = await this.articleService.createArticle(user, data.article);
    return { article };
  }

  @Put('/:slug')
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe())
  async updateArticle(
    @Param('slug') slug: string,
    @User() user: UserEntity,
    @Body() data: { article: UpdateArticleDTO },
  ) {
    const article = await this.articleService.updateArticle(
      slug,
      user,
      data.article,
    );
    return { article };
  }

  @Delete('/:slug')
  @UseGuards(AuthGuard())
  async deleteArticle(@Param('slug') slug: string, @User() user: UserEntity) {
    const article = await this.articleService.deleteArticle(slug, user);
    return { article };
  }

  @Post('/:slug/favorite')
  @UseGuards(AuthGuard())
  async favoriteArticle(@Param('slug') slug: string, @User() user: UserEntity) {
    const article = this.articleService.favoriteArticle(slug, user);
    return { article };
  }

  @Delete('/:slug/favorite')
  async unfavoriteArticle(
    @Param('slug') slug: string,
    @User() user: UserEntity,
  ) {
    const article = this.articleService.unfavoriteArticle(slug, user);
    return { article };
  }
}
