import { IsNotEmpty } from 'class-validator';

export class PaginateDto {
  @IsNotEmpty({ message: 'Page is required' })
  page: number;

  @IsNotEmpty({ message: 'Limit is required' })
  limit: number;
}