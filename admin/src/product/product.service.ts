import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(

        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ) { }

    async all(): Promise<Product[]> {
        return this.productRepository.find();

    }

    async create(product:any): Promise<Product> {
        return this.productRepository.save(product);
    }

    async get(id: number): Promise<Product> {
        console.log(this.productRepository.findOne({ where: { id } }));
        
        return this.productRepository.findOne({ where: { id } });
    }

    async update(id: number, product: any): Promise<Product>{
        await this.productRepository.update(id, product);
        return this.productRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void>{
        await this.productRepository.delete(id);
    }
}
