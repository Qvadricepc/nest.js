import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateListDto {
  @IsOptional()
  @IsString()
  @Length(3, 30)
  name?: string;
}
