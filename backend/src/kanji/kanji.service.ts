import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateKanjiDto, CreateKanjiWordDto, EditKanjiDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class KanjiService {
  constructor(private prisma: PrismaService) {}
  getKanjis(userId: number) {
    return this.prisma.kanji.findMany({
      where: {
        userId,
      },
    });
  }

  getKanjiId(userId: number, kanjiId: number) {
    return this.prisma.kanji.findFirst({
      where: {
        id: kanjiId,
        userId,
      },
    });
  }

  async createKanji(userId: number, dto: CreateKanjiDto) {
    const kanji = await this.prisma.kanji.create({
      data: {
        userId,
        ...dto,
      },
    });

    return kanji;
  }

  async createKanjiWord(userId: number, dto: CreateKanjiWordDto) {
    const { wordId, kanjiId } = dto;

    const word = await this.prisma.word.findFirst({
      where: {
        id: wordId,
        userId: userId,
      },
    });

    if (!word)
      throw new ForbiddenException(
        "Access to resource denied: User does not own the specified word",
      );

    const kanji = await this.prisma.kanji.findFirst({
      where: {
        id: kanjiId,
        userId: userId,
      },
    });

    if (!kanji)
      throw new ForbiddenException(
        "Access to resource denied: User does not own the specified kanji",
      );

    const wordKanji = await this.prisma.wordKanji.create({
      data: {
        wordId: wordId,
        kanjiId: kanjiId,
      },
    });

    return wordKanji;
  }

  async editKanji(userId: number, kanjiId: number, dto: EditKanjiDto) {
    const kanji = await this.prisma.kanji.findUnique({
      where: {
        id: kanjiId,
      },
    });

    if (!kanji || kanji.userId !== userId)
      throw new ForbiddenException("Access to resources denied");

    return this.prisma.kanji.update({
      where: {
        id: kanjiId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteKanji(userId: number, kanjiId: number) {
    const kanji = await this.prisma.kanji.findUnique({
      where: {
        id: kanjiId,
      },
    });

    if (!kanji || kanji.userId !== userId)
      throw new ForbiddenException("Access to resources denied");

    await this.prisma.kanji.delete({
      where: {
        id: kanjiId,
      },
    });
  }
}
