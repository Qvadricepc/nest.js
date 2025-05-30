import { IsString, Length } from 'class-validator';

export class CreateListDto {
  @IsString()
  @Length(3, 30)
  name: string;
}
