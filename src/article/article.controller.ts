import { CreateCommentDTO } from './../models/comment.model';
import { CommentsService } from './comments.service';
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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/auth/user.decorator';
import { ValidationPipe } from 'src/shared/validation.pipe';

@Controller('articles')
export class ArticleController {
  constructor(
    private articleService: ArticleService,
    private commentService: CommentsService,
  ) {}

  @Get()
  @UseGuards(new OptionalAuthGuard())
  async findAll(@User() user: UserEntity, @Query() query: FindAllQuery) {
    const articles = await this.articleService.findAll(user, query);
    return { articles, articlesCount: articles.length };
  }

  @Get('/feed')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
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

  @Get('/:slug/comments')
  async findComments(@Param('slug') slug: string) {
    const comment = await this.commentService.findByArticleSlug(slug);
    return { comment };
  }

  @Post('/:slug/comments')
  @UsePipes(new ValidationPipe())
  async createComment(
    @User() user: UserEntity,
    @Body() data: { comment: CreateCommentDTO },
  ) {
    const comment = await this.commentService.createComment(user, data.comment);
    return { comment };
  }

  @Delete('/:slug/comments/:id')
  async deleteComment(@Param('id') id: number, @User() user: UserEntity) {
    const comment = await this.commentService.deleteComment(user, id);
    return { comment };
  }

  @Post('/:slug/favorite')
  @UseGuards(AuthGuard())
  async favoriteArticle(@Param('slug') slug: string, @User() user: UserEntity) {
    const article = this.articleService.favoriteArticle(slug, user);
    return { article };
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Unfavorite article' })
  @ApiUnauthorizedResponse()
  @Delete('/:slug/favorite')
  @UseGuards(AuthGuard())
  async unfavoriteArticle(
    @Param('slug') slug: string,
    @User() user: UserEntity,
  ) {
    const article = this.articleService.unfavoriteArticle(slug, user);
    return { article };
  }
}
