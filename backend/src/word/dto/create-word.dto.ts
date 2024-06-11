import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateWordDto {
  @IsNotEmpty()
  @IsString()
  word: string;

  @IsNotEmpty()
  @IsString()
  pronunciation: string;

  @IsNotEmpty()
  @IsString()
  meaning: string;

  @IsOptional()
  @IsString()
  sentence?: string;
}
