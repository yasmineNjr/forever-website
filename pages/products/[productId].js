import { MongoClient} from "mongodb";
import ProductDetails from "@/components/products/ProductDetails";
import { useRouter } from "next/router";
import DUMMY_PRODUCTS from "@/data/products";
import { Fragment } from "react";
import Head from "next/head";
import SETTINGS from "@/data/settings";
import AppContext from "@/AppContext";
import { useContext } from "react";

function DetailsPage(props) {
  
    const value = useContext(AppContext);
    const { currentUser } = value.state;
    value.setActivePath(props.productData.titleEn);
    // const router = useRouter();
    // const productId = router.query.productId;
    
    // const product = DUMMY_PRODUCTS.filter(prod => prod.id === productId);
    let cart = props.carts.find(c => {return c.userId === currentUser});
    
    return  (
        <Fragment>
            <Head>
                <title>{props.productData.titleEn}</title>
                <meta name='description' content={props.productData.description}/>
            </Head>
            <ProductDetails  
                // id= {props.productId}
                // image= 'https://static-01.daraz.pk/p/2feb410217f4f68c79e2aa91b04a6b16.jpg'
                // title= 'Forever Aloe Vera Gel'
                // price= '10'
                // description= 'Forever Aloe Vera Gel is a sugar-free drink made from the pure gel from the inner leaf of the aloe vera plant. And also important: no preservatives are added during the processing process, only vitamin C. In addition, the drink is gluten-free. This Aloe Vera Gel is therefore a healthy addition to a balanced diet.'
                // ingredients= 'none'
                // department= 'Dietary Supplement'
                // groups= 'none'
                // rate= '5'
                id={props.productData.id}
                image={props.productData.image}
                titleId={props.productData.titleId}
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
                test={props.productData.test}
            />
        </Fragment>
    )
    
        
}
export async function getStaticProps(context){
    
    const productId = context.params.productId;
    
   //fetch data from API
   const client = await MongoClient.connect(
    'mongodb+srv://foreverUser:PwDV1m7yVI0D72uc@cluster0.ci8azls.mongodb.net/foreverDB?retryWrites=true&w=majority'
    );
    const db = client.db();
    const productsCollection = db.collection('products');
    //const selectedProduct = await productsCollection.findOne({_id: ObjectId(productId)}).toArray();
    const selectedProduct = await productsCollection.findOne({titleId: productId});
    const cartCollection = db.collection('carts');
    let selectedCart;
    if(cartCollection){
        //selectedCart = await cartCollection.findOne({userId: SETTINGS.currentUser});
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
                // id: '64ff37af44ce1c7db55ac008',
                // image: 'https://static-01.daraz.pk/p/2feb410217f4f68c79e2aa91b04a6b16.jpg',
                // title: 'title',
                // price: '12',
                // description: 'description',
                // ingredients: 'none',
                // department:'department',
                // groups: 'groups',
                // rate: '3',
            },
            // cart: selectedCart ? 
            // {
            //     id: selectedCart._id.toString(),
            //     userId: selectedCart.userId,
            //     products: selectedCart.products,
            // }
            // :
            // null
            carts: selectedCart.map((cart) => ({
                id: cart._id.toString(),
                userId: cart.userId,
                currency: cart.currency,
                products: cart.products,
            }))
         },
         //this is used to rerender the page every x seconds and it is useful if there are a lot of requests
         //=== the page is updated regularly after deployment
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
    // const products = await productsCollection.find({}, {_id: 1}).toArray();
    // const prods = products.map(product => ({params: { productId: product._id.toString() }}));
    const products = await productsCollection.find({}, {titleId: 1}).toArray();
    let prods ;
    // if(products)
    prods = products.map(product => {return {params: { productId: product.titleId }}});
    client.close();
    
    return {
        //fallback tells nextjs if path parameter contains all data(dynamic pages) or some of it(most visited as example)
        //false means it contains all data
        fallback: false,
        paths: prods,
    }
    // return {
    //     //fallback tells nextjs if path parameter contains all data(dynamic pages) or some of it(most visited as example)
    //     //false means it contains all data
    //     fallback: false,
    //     paths: [
    //         { params: { productId: 'vvv' } },
    //         { params: { productId: 'The mini slimming group' } },
    //         { params: { productId: 'Forever Therm' } }
    //       ]
    // }
}
export default DetailsPage;