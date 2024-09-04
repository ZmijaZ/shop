import { useQuery } from "@apollo/client";
import { ALL_ORDERS } from "../../graphQL/queries";

const Orders = () => {

    const orderResult = useQuery(ALL_ORDERS);

    if(orderResult.loading){
        return <div>loading...</div>
    }
    console.log(orderResult.data.allOrders);

    return (
        <>
            <h1>Orders</h1>
        </>
    );
};

export default Orders;