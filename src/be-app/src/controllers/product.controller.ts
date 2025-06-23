import { Controller, Delete, Get, Put, Post, Body, Param, UsePipes, ValidationPipe, HttpCode, UseGuards } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { PaginateDto } from 'src/dto/paginate.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ProductService } from 'src/services/product.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard)
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return { data: product };
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard)
  async findAll(@Body() paginateDto: PaginateDto) {
    const product = await this.productService.findAllByPage(paginateDto.page, paginateDto.limit);
    return { data: product[0], total: product[1], page: paginateDto.page ?? 1 };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param() params: { id: string }) {
    const product = await this.productService.findOne(params.id);
    return { data: product };
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard)
  async update(@Param() params: { id: string }, @Body() UpdateProductDto: UpdateProductDto) {
    const product = await this.productService.update(params.id, UpdateProductDto);
    return { data: product };
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async delete(@Param() params: { id: string }) {
    const product = await this.productService.delete(params.id);
    return { data: product };
  }
}
