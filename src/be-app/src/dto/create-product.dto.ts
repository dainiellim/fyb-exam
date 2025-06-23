import {IsNotEmpty} from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty({ message: 'SKU is required' })
    sku: string;
  
    category: string;
  
    @IsNotEmpty({ message: 'Brand is required' })
    brand: string;
  
    @IsNotEmpty({ message: 'Name is required' })
    name: string;
  
    description: string;
}