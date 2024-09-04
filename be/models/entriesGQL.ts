const typeDefs = `
    type User{
        username: String!
        name: String!
        id: ID!
    }

    type Query {
        allUsers: [User!]!
    }

    type Mutation {
        createUser(
            username: String!
            name: String!
            password: String!
        ): User
    }
`;

export default typeDefs;