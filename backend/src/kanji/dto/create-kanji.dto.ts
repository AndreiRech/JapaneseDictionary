import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateKanjiDto {
  @IsString()
  @IsNotEmpty()
  kanji: string;

  @IsString()
  @IsOptional()
  onyomi?: string;

  @IsString()
  @IsOptional()
  kunyomi?: string;
}
