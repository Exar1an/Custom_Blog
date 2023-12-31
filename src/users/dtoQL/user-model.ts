import { ObjectType, Field } from '@nestjs/graphql';
import { RoleModel } from '../..//roles/dtoQL/roles-model';
import { PostModel } from '../../posts/dtoQL/posts-model';
import { BlogModel } from '../../blogs/dtoQL/blog-model';


@ObjectType()
export class UserModel {
    @Field()
    id: number;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    banned: boolean;
    
    @Field()
    banReason: string;

    @Field(() => [RoleModel])
    roles: RoleModel[];
    
    @Field(() => [PostModel])
    posts: PostModel[]

    @Field(() => [BlogModel])
    blogs: BlogModel[]
}