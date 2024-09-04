import { useQuery } from "@apollo/client";
import { ORDER_COUNT, PRODUCT_COUNT, TOTAL_ORDER_PRICE, USERS_AVERAGE_SPENT } from "../../queries/queries";

const Dashboard = () => {
    const numberOfOrdersResult = useQuery(ORDER_COUNT);
    const totalOrderPriceResult = useQuery(TOTAL_ORDER_PRICE);
    const averageUserSpendingResult = useQuery(USERS_AVERAGE_SPENT);
    const totalProductsResult = useQuery(PRODUCT_COUNT);
    const totalProductInactiveResult = useQuery(PRODUCT_COUNT,
            {variables: {active: false}}
        )

    // TODO rewrite this
    if(
        numberOfOrdersResult.loading
        || totalOrderPriceResult.loading
        || averageUserSpendingResult.loading
        || totalProductsResult.loading
        || totalProductInactiveResult.loading
        ){
        return <div>loading orders... </div>
    }


    const numberOfOrders = numberOfOrdersResult.data.orderCount;
    const totalOrderPrice = totalOrderPriceResult.data.totalOrderPrice;
    const averageUserSpending = averageUserSpendingResult.data.averageCustomerSpending;
    const productCount = totalProductsResult.data.productCount;
    const inactiveProductCount = totalProductInactiveResult.data.productCount;

    return(
        <>
            <h1>Dashboard</h1>
            <div>
                <h3>Sales</h3>
                <p>{numberOfOrders} orders</p>
                <br/>
                <strong>${totalOrderPrice/100}</strong>
            </div>

            <div>
                <h3>Customers</h3>
                <p>${averageUserSpending/100} Average value</p>
                <br/>
                <strong>{}</strong>
            </div>

            <div>
                <h3>Active Products</h3>
                <p>{inactiveProductCount} Inactive</p>
                <br/>
                <strong>{productCount}</strong>
            </div>
        </>
    );
};

export default Dashboard;