import { Controller, Delete, Get, Put, Post } from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor() {}
  
  @Post()
  create(): string {
    return 'This action adds a product';
  }

  @Get()
  findAll(): string {
    return 'This action returns all products';
  }
  
  @Get(':id')
  findOne(): string {
    return 'This action returns one product';
  }

  @Put(':id')
  update(): string {
    return 'This action updates a product';
  }

  @Delete(':id')
  delete(): string {
    return 'This action deletes a product';
  }
}
