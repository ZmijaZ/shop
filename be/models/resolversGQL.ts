import { GraphQLError } from "graphql";
import User from "./user"
import Product from "./product";

import bcrypt from 'bcryptjs'

const resolvers = {
    Query: {
        allUsers: async () => {
            let resultUsers = await User.find({});
            
            return resultUsers;
        },
        allProducts: async () => {
            let resultProducts = await Product.find({});

            return resultProducts;
        }
    },
    Mutation: {
        createUser: async (_root, args) => {
            const {username, name, email, password} = args;

            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            const user = new User({username, name, email, passwordHash});
            
            try{
                await user.save();
            } catch (error) {
                throw new GraphQLError('Creating the user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                });
            }
            return user;
        },
        createProduct: async (_root, args) => {
            const product = new Product({...args});
            try{
                await product.save();
            } catch (error) {
                throw new GraphQLError('Creating a product failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
            return product;
        }
    }
}

export default resolvers;