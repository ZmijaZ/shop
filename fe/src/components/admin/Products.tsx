import { useQuery } from "@apollo/client";
import { ALL_PRODUCTS } from "../../queries/queries";
import { Product } from "../../types";
import ProductForm from "./ProductForm";

interface ProductProps{
    product: Product
}

const ProductComponent = (props: ProductProps) => {
    const {name, priceInCents, isAvailableForPurchase} = props.product;
    return (
        <div>
            <p>name: {name}</p>
            <p>price: ${priceInCents/100}</p>
            <p>Available: {isAvailableForPurchase ? "yes" : "no"}</p>
        </div>
    )
}

const Products = () => {

    const productResult = useQuery(ALL_PRODUCTS);

    if(productResult.loading){
        return <div>loading...</div>
    }
    
    const products = productResult.data.allProducts;
    return (
        <>
            <h1>Products</h1>
            <button>Add Product</button>

            <ProductForm/>

            <div>                
                <h1>All products</h1>
                {products.map((p: Product) => 
                    <ProductComponent key = {p.id} product={p}/>
                )}
            </div>
        </>
    );
};

export default Products;