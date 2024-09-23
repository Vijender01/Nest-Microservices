import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('product')
export class ProductController {

    constructor(
        private productService: ProductService,

        @Inject("PRODUCT_SERVICE") private readonly client: ClientProxy

    ) { }

    @Get()
    all() {
        this.client.emit('hello', 'Hello from RabbitMQ')
        console.log('inside all');

        return this.productService.all();
    }

    @Post()
    async create(
        @Body('title') title: string,
        @Body('image') image: string,
    ) {

        const product = await this.productService.create({
            title, image,
        })

        const response = await firstValueFrom(this.client
            .send({ cmd: 'product_created' }, product)) // Convert to a Promise if needed

        console.log('inside adminnnnnnnnnnnn', response.message);


        return product
    }


    @Get(':id')
    async get(
        @Param('id') id: number,
    ) {
        console.log('inside getby id');

        return await this.productService.get(id);

    }


    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body('title') title: string,
        @Body('image') image: string,
    ) {


        await this.productService.update(id, {
            title, image,
        });

        const product = await this.productService.get(id);

        this.client.emit('product_updated', product);

        return product;
    }

    @Delete(':id')
    async delete(
        @Param('id') id: number,
    ) {
        this.client.emit('product_deleted', id);
    }
}
