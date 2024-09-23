import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService ){}

    @Get()
    async all(){
        return await this.productService.all()
    }

    @EventPattern('hello')
    async hello(data: string){
        console.log('This is the data>>>>>',data);
        
    }

    @EventPattern({ cmd: 'product_created' })
    async productCreated(product:any){

        await this.productService.create({
            id:product.id,
            title:product.title,
            image:product.image,
            likes: product.likes,
        })
        return { success: true, message: 'Product successfully created in microservice'};
    }

    @EventPattern('product_created')
    async productUpdated(product:any){

        await this.productService.update(product.id,{
            title:product.title,
            image:product.image,
            likes: product.likes,
        })
    }
}
