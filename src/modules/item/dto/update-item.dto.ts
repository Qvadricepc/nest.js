import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  @Length(3, 120)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isDone?: boolean;
}
