import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateKanjiWordDto {
  @IsNotEmpty()
  @IsNumber()
  wordId: number;

  @IsNotEmpty()
  @IsNumber()
  kanjiId: number;
}
