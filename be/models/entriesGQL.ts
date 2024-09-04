const typeDefs = `

    scalar Date

    type User{
        username: String!
        name: String!
        email: String!
        createdAt: Date
        updatedAt: Date
        orders: [Order]
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

    type Order{
        pricePaidInCents: Int!
        createdAt: Date!
        updatedAt: Date
        user: User!
        products: [Product!]!
    }

    type Query {
        allUsers: [User!]!
        allProducts: [Product!]!
        allOrders: [Order!]!
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

        createOrder(
            pricePaidInCents: Int!
            updatedAt: Date
            user: String!
            products: [String!]!
        ): Order
    }
`;


//TODO add downloadVerification (maybe?!)
export default typeDefs;