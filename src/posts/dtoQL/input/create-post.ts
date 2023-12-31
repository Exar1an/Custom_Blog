import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreatePostInput {

    @Field()
    @IsNotEmpty()
    @IsString({ message: "Must be string" })
    title: string;

    @Field()
    @IsNotEmpty()
    @IsString({ message: "Must be string" })
    content: string

}