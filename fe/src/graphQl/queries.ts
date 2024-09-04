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

export const USER_COUNT = gql`
    query{
        userCount
    }
`
export const USERS_AVERAGE_SPENT = gql`
    query{
        averageCustomerSpending
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
export const PRODUCT_COUNT = gql`
    query productCount($active: Boolean){
        productCount (active: $active)
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

export const ORDER_COUNT = gql`
    query{
        orderCount
    }
`

export const TOTAL_ORDER_PRICE = gql`
    query{
        totalOrderPrice
    }
`

