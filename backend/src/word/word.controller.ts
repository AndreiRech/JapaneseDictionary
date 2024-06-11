import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guard";
import { WordService } from "./word.service";
import { GetUser } from "../auth/decorator";
import { CreateWordDto, EditWordDto } from "./dto";

@UseGuards(JwtGuard)
@Controller("words")
export class WordController {
  constructor(private wordsService: WordService) {}
  @Get()
  getWords(@GetUser("id") userId: number) {
    return this.wordsService.getWords(userId);
  }

  @Get(":id")
  getWordId(@GetUser("id") userId: number, @Param("id", ParseIntPipe) wordId: number) {
    return this.wordsService.getWordId(userId, wordId);
  }

  @Get(":meaning")
  getWordMeaning(@GetUser("id") userId: number, @Param("meaning", ParseIntPipe) meaning: string) {
    return this.wordsService.getWordMeaning(userId, meaning);
  }

  @Get(":pronunciation")
  getWordPronunciation(@GetUser("id") userId: number, @Param("meaning", ParseIntPipe) pronunciation: string) {
    return this.wordsService.getWordPronunciation(userId, pronunciation);
  }

  @Post("create")
  createWord(@GetUser("id") userId: number, @Body() dto: CreateWordDto) {
    return this.wordsService.createWord(userId, dto);
  }

  @Patch(":id")
  editWord(@GetUser("id") userId: number, @Param("id", ParseIntPipe) wordId: number, @Body() dto: EditWordDto,) {
    return this.wordsService.editWord(userId, wordId, dto);
  }
  
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  deleteWord(@GetUser("id") userId: number, @Param("id", ParseIntPipe) wordId: number) {
    return this.wordsService.deleteWord(userId, wordId);
  }
}
