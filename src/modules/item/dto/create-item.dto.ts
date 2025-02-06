import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 120)
  description: string;

  @IsOptional()
  @IsBoolean()
  isDone?: boolean;

  @IsString()
  @IsNotEmpty()
  listId: string;
}
