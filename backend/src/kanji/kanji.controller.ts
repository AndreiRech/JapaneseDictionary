import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtGuard } from "../auth/guard";
import { KanjiService } from "./kanji.service";
import { GetUser } from "../auth/decorator";
import { CreateKanjiDto, CreateKanjiWordDto, EditKanjiDto } from "./dto";

@UseGuards(JwtGuard)
@Controller("kanjis")
export class KanjiController {
  constructor(private kanjiService: KanjiService) {}
  @Get()
  getKanjis(@GetUser("id") userId: number) {
    return this.kanjiService.getKanjis(userId);
  }

  @Get(":id")
  getKanjiId(@GetUser("id") userId: number, @Param("id", ParseIntPipe) kanjiId: number) {
    return this.kanjiService.getKanjiId(userId, kanjiId);
  }

  @Post("create")
  createKanji(@GetUser("id") userId: number, @Body() dto: CreateKanjiDto) {
    return this.kanjiService.createKanji(userId, dto);
  }

  @Post("associate")
  createKanjiWord(@GetUser("id") userId: number, @Body() dto: CreateKanjiWordDto) {
    return this.kanjiService.createKanjiWord(userId, dto);
  }

  @Patch(":id")
  editKanji(
    @GetUser("id") userId: number,
    @Param("id", ParseIntPipe) kanjiId: number,
    @Body() dto: EditKanjiDto,
  ) {
    return this.kanjiService.editKanji(userId, kanjiId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  deleteKanji(@GetUser("id") userId: number, @Param("id", ParseIntPipe) kanjiId: number) {
    return this.kanjiService.deleteKanji(userId, kanjiId);
  }
}
