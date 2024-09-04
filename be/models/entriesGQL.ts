const typeDefs = `

    scalar Date

    type User{
        username: String!
        name: String!
        email: String!
        createdAt: Date
        updatedAt: Date
        id: ID!
    }

    type Product{
        name: String!
        priceInCents: Int!
        filePath: String
        imagePath: String
        description: String
        isAvailableForPurchase: Boolean!
        createdAt: Date
        updatedAt: Date
        id: ID!
    }

    type Query {
        allUsers: [User!]!
        allProducts: [Product!]!
    }

    type Mutation {
        createUser(
            username: String!
            name: String!
            email: String!
            password: String!
        ): User

        createProduct(
            name: String!
            priceInCents: Int!
            filePath: String
            imagePath: String
            description: String
            isAvailableForPurchase: Boolean
        ): Product
    }
`;

export default typeDefs;