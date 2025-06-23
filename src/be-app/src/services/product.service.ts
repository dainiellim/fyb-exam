import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    async findOne(id : string): Promise<Product> 
    {
        const product = await this.productRepository.findOneBy({ 'id' : id });
        if (!product) {
            throw new NotFoundException("Something wen't wrong please contact your admin support!");
        }
        return product;
    }

    async findAllByPage(page: number = 1, limit: number = 10): Promise<[Product[], number]> 
    {
        const skip = (page - 1) * limit;
        const paginatedProducts = await this.productRepository.findAndCount({
            skip: skip,
            take: limit,
            order: { created_at: 'DESC' },
        });

        return paginatedProducts;
    }

    async create(createProductDto: CreateProductDto): Promise<Product> 
    {
        const findDuplicateSKU = await this.productRepository.findOneBy({ 'sku' : createProductDto.sku });
        if (findDuplicateSKU) {
            throw new NotFoundException("Product SKU already exists!");
        }
        const product = await this.productRepository.create(createProductDto)

        const savedProduct = await this.productRepository.save(product);

        return savedProduct;
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> 
    {
        const product = await this.productRepository.findOneBy({ 'id' : id });
        if (!product) {
            throw new NotFoundException("Product does not exists!");
        }
        const findDuplicateSKU = await this.productRepository.findOneBy({
             'sku' : updateProductDto.sku,
             'id' : Not(id),
            });
        if (findDuplicateSKU) {
            throw new NotFoundException("Product SKU already exists!");
        }
        this.productRepository.update(id, updateProductDto);
        return product;
    }

    async delete(id: string): Promise<Boolean> 
    {
        const existValidation = await this.productRepository.findOneBy({ 'id' : id });
        if (!existValidation) {
            throw new NotFoundException("Product does not exists!");
        }
        const product = await this.productRepository.softDelete({id});
        return true;
    }
}
