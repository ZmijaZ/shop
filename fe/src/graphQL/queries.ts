import { gql } from "@apollo/client";

export const ALL_USERS = gql`
    query{
        allUsers{
            name
            username
            email
            orders {
                pricePaidInCents
                createdAt
            }
            id
        }
    }
`

export const ALL_PRODUCTS = gql`
    query{
        allProducts{
            name
            priceInCents
            description
            isAvailableForPurchase
            createdAt
            updatedAt
        }
    }
`

export const ALL_ORDERS = gql `
    query{
        allOrders {
            pricePaidInCents
            createdAt
            user {
                name
                email
            }
            products {
                priceInCents
                name
            }
        }
    }
`