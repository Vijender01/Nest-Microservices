import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"

export type ProductDocument = Product & Document;

@Schema()
export class Product{

    @Prop()
    id: string;

    @Prop()
    title: string;

    @Prop()
    image: string;

    @Prop()
    likes: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);