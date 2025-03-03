import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
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

  @IsUUID()
  @IsNotEmpty()
  listId: string;
}
