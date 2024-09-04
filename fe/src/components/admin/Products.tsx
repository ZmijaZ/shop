import { useQuery } from "@apollo/client";
import { ALL_PRODUCTS } from "../../graphQL/queries";

const Products = () => {

    const productResult = useQuery(ALL_PRODUCTS);

    if(productResult.loading){
        return <div>loading...</div>
    }
    console.log(productResult.data.allProducts);

    return (
        <>
            <h1>Products</h1>
        </>
    );
};

export default Products;