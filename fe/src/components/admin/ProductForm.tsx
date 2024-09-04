import { useState } from "react";
import { NewProduct } from "../../types";
import { useMutation } from "@apollo/client";
import { ALL_PRODUCTS, CREATE_PRODUCT } from "../../queries/queries";

const ProductForm = () => {

    const emptyProduct = {
        name: "",
        description: "",
        priceInCents: 0, //TODO solve this
        isAvailableForPurchase: true,
    };

    const [product, setProduct] = useState<NewProduct>(emptyProduct)

    const [createProduct] = useMutation(CREATE_PRODUCT, {
        refetchQueries: [
            {query: ALL_PRODUCTS}
        ],
        onError: (error) => {
            const messages = error.graphQLErrors.map(e => e.message).join('\n')
            console.log(messages);
        }
        //TODO update cache
    })

    const handleChange = (e: React.SyntheticEvent) => {
        const {name, value} = e.target as HTMLTextAreaElement;

        if(name == "isAvailableForPurchase" ){
            const newValue = value == "true" ? true : false;
            setProduct({...product, [name]: newValue});
            return;
        } 

        setProduct({...product, [name]: value});
        console.log(product);
    }

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const {name, description, priceInCents, isAvailableForPurchase} = product;

        console.log(product);
        console.log(typeof product.isAvailableForPurchase);

        createProduct({
            variables: {
                name,
                description,
                priceInCents: Number(priceInCents),
                isAvailableForPurchase
            }
        })

    }

    return (
        <div>
            <h1>Product form</h1>
            <form>
                <div>
                    name <input name = 'name' value = {product.name} onChange = {handleChange}/>
                </div>
                <div>
                    description <input name = 'description' value = {product.description} onChange = {handleChange}/>
                </div>
                <div>
                    price in cents <input name = 'priceInCents' value = {product.priceInCents} onChange = {handleChange}/>
                </div>
                <div>
                    availability 
                    yes<input type = "radio" name = "isAvailableForPurchase" value = "true" onChange = {handleChange} />
                    no<input type = "radio" name = "isAvailableForPurchase" value = "false" onChange = {handleChange} />
                </div>
                <button onClick={onSubmit}>Submit</button>
            </form>
        </div>
        
    )
}

export default ProductForm