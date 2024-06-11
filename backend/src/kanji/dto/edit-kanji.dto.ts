import { IsOptional, IsString } from "class-validator";

export class EditKanjiDto {
  @IsString()
  @IsOptional()
  kanji?: string;

  @IsString()
  @IsOptional()
  onyomi?: string;

  @IsString()
  @IsOptional()
  kunyomi?: string;
}
