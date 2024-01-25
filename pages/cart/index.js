import { MongoClient} from "mongodb";
import CartList from "@/components/carts/CartLict";
import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from 'next/router';
import AppContext from "@/AppContext";
import { useContext } from "react";

function CartPage(props) {
    
    const router = useRouter();
    //////////refresh cart icon////////////
    const value = useContext(AppContext);
    const { ordersCount, translateObj, currentUser } = value.state;
    
    let cart = props.carts.find(c => {return c.userId === currentUser});

    value.setActivePath('/cart');

    async function addOrderHandler(enteredData){
        const response = await fetch('/api/new-order', {
            method: 'POST',
            body: JSON.stringify(enteredData),
            header: {
                'Content/Type': 'application/json'
            }
        });
        const data = await response.json();
    }
    async function updateSalesCountHandler(enteredData){
        const response = await fetch('/api/new-product', {
            method: 'POST',
            body: JSON.stringify(enteredData),
            header: {
                'Content/Type': 'application/json'
            }
        });
        const data = await response.json();
    }
    async function deleteCartHandler(enteredCartData){
        const response = await fetch('/api/new-cart', {
            method: 'DELETE',
            body: JSON.stringify(enteredCartData),
            header: {
                'Content/Type': 'application/json'
            }
        });
        const data = await response.json();
    }
    function orderHandler() {
        
        let prods = [];
        // console.log(props.cart.products)
        props.cart.products.map(product => {if(Number(product.quantity) !== 0) prods.push(product);});
        const enteredData ={
            userId: currentUser,
            date: new Date(),
            products: prods,
            currency: props.cart.currency,
            status: 'In progress'
            }
        
        //update sales count
        prods.map(pro =>{
            const productData ={
                titleId: pro.titleEn,
                quantity: pro.quantity
            }
            updateSalesCountHandler(productData);
            //console.log(pro)
        })
        //add order
        addOrderHandler(enteredData); 
        //delete cart
        deleteCartHandler(enteredData);
        //refresh cart icon
        value.setCartItemsCount(0);
         //refresh orders icon
         value.setOrdersCount(Number(ordersCount) + 1);
        //rediect to orders page   
        let path;
        path = '/orders/' ;
        router.push(path);
    }

    return (
        <Fragment>
             <Head>
                <title>{translateObj.cart}</title>
                <meta name='description' content={translateObj.cartDescription}/>
            </Head>
            {
                currentUser !== ''
                ?
                <CartList cart = {cart}  order={orderHandler}/> 
                :
                <div style={{color: '#989898', display: 'flex', justifyContent: 'center', margin: '5rem', fontSize: '1rem'}}>
                    {translateObj.loginToShow}
                </div>
            }
        </Fragment>
    )
    //<CartList products = {cart.products}/> 
}

export async function getStaticProps(){
    //fetch data from API
    const client = await MongoClient.connect(
     'mongodb+srv://foreverUser:PwDV1m7yVI0D72uc@cluster0.ci8azls.mongodb.net/foreverDB?retryWrites=true&w=majority'
     );
     const db = client.db();
     const cartCollection = db.collection('carts');
     let selectedCart;
     if(cartCollection){
        //  selectedCart = await cartCollection.findOne({userId: SETTINGS.currentUser});
        selectedCart = await cartCollection.find().toArray();
     }
     client.close();
     return {
         props: {
            // cart: selectedCart ? 
            //     {
            //         id: selectedCart._id.toString(),
            //         userId: selectedCart.userId,
            //         currency: selectedCart.currency,
            //         products: selectedCart.products,
            //     }
            //     :
            //     null,
            carts: selectedCart.map((cart) => ({
                id: cart._id.toString(),
                userId: cart.userId,
                currency: cart.currency,
                products: cart.products,
            }))
            
        },
         revalidate: 10
     }
 }

export default CartPage;