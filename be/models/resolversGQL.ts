import { GraphQLError } from "graphql";
import User from "./user"
import bcrypt from 'bcryptjs'

const resolvers = {
    Query: {
        allUsers: async () => {
            let resultUsers = await User.find({});
            
            return resultUsers;
        }
    },
    Mutation: {
        createUser: async (_root, _args) => {
            const {username, name, password} = _args;

            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            const user = new User({username, name, passwordHash});
            
            try{
                await user.save();
            } catch (error) {
                throw new GraphQLError('Creating the user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: _args.name,
                        error
                    }
                });
            }
            return user;
        }
    }
}

export default resolvers;