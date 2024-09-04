import { GraphQLError } from "graphql";
import User from "./user"
import Product from "./product";

import bcrypt from 'bcryptjs'
import Order from "./order";

const resolvers = {
    Query: {
        allUsers: async () => {
            let resultUsers = await User.find({})
                .populate('orders');
            
            return resultUsers;
        },
        userCount: async () => User.collection.countDocuments(),
        allProducts: async () => {
            let resultProducts = await Product.find({});

            return resultProducts;
        },
        averageCustomerSpending: async () => {
            const users = await User.find({}).populate('orders');
            const userOrders = users.map(u => u.orders);

            let res : number = 0;
            //TODO rewrite this!
            for(let i = 0; i < userOrders.length; i++){
               for(let j = 0; j < userOrders[i].length; j++){
                    res += userOrders[i][j]['pricePaidInCents']; 
               }
            }
            
            return Math.round(res/users.length);
        },
        productCount: async (_root, args) => {
            let res : number = 0;

            console.log(args);

            if(args){
                res = await Product.collection.countDocuments({isAvailableForPurchase:args.active});
            };
            
            if(!res)
                res = await Product.collection.countDocuments();
            

            return res;
        },
        allOrders: async () => {
            let resultOrders = await Order.find({})
                .populate('user')
                .populate('products');


            return resultOrders;
        },
        orderCount: async () => Order.collection.countDocuments(),
        totalOrderPrice: async () => {
            const allOrders = await Order.find();
            return allOrders.reduce((acc, curr) => acc + curr.pricePaidInCents, 0)
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
        },
        createOrder: async (_root, args) => {
            const user = await User.findOne({username: args.user});
            const products = await Product.find({name: {$in: args.products}});

            const order = new Order({
                ...args,
                user,
                products,
            });

            try{
                await order.save();
               
                await User.updateOne(
                    {username: args.user},
                    {$push: {orders: order}}    
                )
            } catch (error) {
                throw new GraphQLError('Creating an order failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
            return order;
        }
    }
}

export default resolvers;