import { MongoClient} from "mongodb";
import ProductDetails from "@/components/products/ProductDetails";
import { Fragment } from "react";
import Head from "next/head";
import AppContext from "@/AppContext";
import { useContext } from "react";

function DetailsPage(props) {
    const value = useContext(AppContext);
    const { currentUser, userCart } = value.state;
    value.setActivePath(props.productData.titleEn);
    // let cart = props.carts.find(c => {return c.userId === currentUser});
    let cart = userCart;

    return (
        <Fragment>
             <Head>
                <title>{props.productData.titleEn}</title>
                <meta name='description' content={props.productData.description}/>
            </Head>
            <ProductDetails  
                id={props.productData.id}
                titleId={props.productData.titleId}
                image={props.productData.image}
                titleEn={props.productData.titleEn}
                titleAr={props.productData.titleAr}
                price={props.productData.price}
                descriptionEn={props.productData.descriptionEn}
                descriptionAr={props.productData.descriptionAr}
                ingredients={props.productData.ingredients}
                departmentEn={props.productData.departmentEn}
                departmentAr={props.productData.departmentAr}
                groups={props.productData.groups}
                rate={props.productData.rate}
                cart={cart}
            />
        </Fragment>
    );
    
}
export async function getStaticProps(context){
    const groupId = context.params.groupId;
    
   //fetch data from API
   const client = await MongoClient.connect(
    'mongodb+srv://foreverUser:PwDV1m7yVI0D72uc@cluster0.ci8azls.mongodb.net/foreverDB?retryWrites=true&w=majority'
    );
    const db = client.db();
    const productsCollection = db.collection('products');
    const selectedProduct = await productsCollection.findOne({titleId: groupId});

    const cartCollection = db.collection('carts');
    let selectedCart;
    if(cartCollection){
        selectedCart = await cartCollection.find().toArray();
    }

    client.close();

     return {
         props: {
            productData: {
                id: selectedProduct._id.toString(),
                image: selectedProduct.image,
                titleId: selectedProduct.titleId,
                titleEn: selectedProduct.title.en,
                titleAr: selectedProduct.title.ar,
                price: selectedProduct.price,
                descriptionEn: selectedProduct.description.en,
                descriptionAr: selectedProduct.description.ar,
                ingredients: selectedProduct.ingredients,
                departmentEn: selectedProduct.department.en,
                departmentAr: selectedProduct.department.ar,
                groups: selectedProduct.groups,
                rate: selectedProduct.rate,
            },
            // carts: selectedCart.map((cart) => ({
            //     id: cart._id.toString(),
            //     userId: cart.userId,
            //     currency: cart.currency,
            //     products: cart.products,
            // }))
         },
         revalidate: 10
     }
}
export async function getStaticPaths(){
    //fetch data from API
    const client = await MongoClient.connect(
        'mongodb+srv://foreverUser:PwDV1m7yVI0D72uc@cluster0.ci8azls.mongodb.net/foreverDB?retryWrites=true&w=majority'
        );
    const db = client.db();
    const productsCollection = db.collection('products');
    const products = await productsCollection.find({}, {titleId: 1}).toArray();
    const prods = products.map(product => {return {params: { groupId: product.titleId }}});
    client.close();
    
    return {
        fallback: false,
        paths: prods,
    }
}
export default DetailsPage;