import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateWordDto, EditWordDto } from "./dto";

@Injectable()
export class WordService {
  constructor(private prisma: PrismaService) {}
  getWords(userId: number) {
    return this.prisma.word.findMany({
      where: {
        userId,
      },
    });
  }

  getWordId(userId: number, wordId: number) {
    return this.prisma.word.findFirst({
      where: {
        id: wordId,
        userId,
      },
    });
  }

  getWordMeaning(userId: number, meaning: string) {
    return this.prisma.word.findMany({
      where: {
        meaning: {
          contains: meaning,
          mode: "insensitive",
        },
        userId,
      },
    });
  }

  getWordPronunciation(userId: number, pronunciation: string) {
    return this.prisma.word.findMany({
      where: {
        pronunciation: {
          contains: pronunciation,
          mode: "insensitive",
        },
        userId,
      },
    });
  }

  async createWord(userId: number, dto: CreateWordDto) {
    const word = await this.prisma.word.create({
      data: {
        userId,
        ...dto,
      },
    });

    return word;
  }

  async editWord(userId: number, wordId: number, dto: EditWordDto) {
    const word = await this.prisma.word.findUnique({
      where: {
        id: wordId,
      },
    });

    if (!word || word.userId !== userId) throw new ForbiddenException("Access to resources denied");

    return this.prisma.word.update({
      where: {
        id: wordId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteWord(userId: number, wordId: number) {
    const word = await this.prisma.word.findUnique({
      where: {
        id: wordId,
      },
    });

    if (!word || word.userId !== userId) throw new ForbiddenException("Access to resources denied");

    await this.prisma.word.delete({
      where: {
        id: wordId,
      },
    });
  }
}
