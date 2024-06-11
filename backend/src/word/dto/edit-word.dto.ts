import { IsOptional, IsString } from "class-validator";

export class EditWordDto {
  @IsOptional()
  @IsString()
  word?: string;

  @IsOptional()
  @IsString()
  pronunciation?: string;

  @IsOptional()
  @IsString()
  meaning?: string;

  @IsOptional()
  @IsString()
  sentence?: string;
}
