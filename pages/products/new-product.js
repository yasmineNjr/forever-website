import NewProductForm from "@/components/products/NewProductForm";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import { useContext } from "react";
import AppContext from "@/AppContext";

function NewProduct() {
    const router = useRouter();
    const value = useContext(AppContext);
    value.setActivePath('products/new-product');

    async function addProductHandler(enteredProducData){
        //console.log(JSON.stringify(enteredProducData));
        const response = await fetch('/api/new-product', {
            method: 'POST',
            body: JSON.stringify(enteredProducData),
            header: {
                'Content/Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        router.push('/');
        //this to insure that we can not go back to this page
        //router.replace('/');
    }

    return (
        <Fragment>
            <Head>
                <title>New Product</title>
                <meta name='description' content='Add new product.'/>
            </Head>
            <NewProductForm onAddProduct={addProductHandler}/>
        </Fragment>
    ) 
}

export default NewProduct;