import { IsNotEmpty, IsString } from "class-validator";

export class CreateKanjiWordDto {
  @IsString()
  @IsNotEmpty()
  wordId: number;

  @IsString()
  @IsNotEmpty()
  kanjiId: number;
}
