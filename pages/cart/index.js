// import { MongoClient} from "mongodb";
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
    const { translateObj, currentUser, userCart } = value.state;
   
    let cart = userCart;
    //set active path   
    value.setActivePath('/cart');

    function orderHandler() {
        let path;
        path = '/orders/form' ;
        // path = '/createOrder' ;
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
                <CartList cart={cart}  order={orderHandler}/> 
                :
                <div style={{color: '#989898', display: 'flex', justifyContent: 'center', margin: '5rem', fontSize: '1rem'}}>
                    {translateObj.loginToShow}
                </div>
            }
        </Fragment>
    )
}
// export async function getServerSideProps(context){
//      //fetch data from API
//      const client = await MongoClient.connect(
//         'mongodb+srv://foreverUser:PwDV1m7yVI0D72uc@cluster0.ci8azls.mongodb.net/foreverDB?retryWrites=true&w=majority'
//         );
//         const db = client.db();
//         const cartCollection = db.collection('carts');
//         let selectedCart;
//         if(cartCollection){
//            //  selectedCart = await cartCollection.findOne({userId: SETTINGS.currentUser});
//            selectedCart = await cartCollection.find().toArray();
//         }
//         client.close();
//         return {
//             props: {
//                carts: selectedCart.map((cart) => ({
//                    id: cart._id.toString(),
//                    userId: cart.userId,
//                    currency: cart.currency,
//                    products: cart.products,
//                }))
               
//            },
//         }
// }
// export async function getStaticProps(){
//     //fetch data from API
//     const client = await MongoClient.connect(
//      'mongodb+srv://foreverUser:PwDV1m7yVI0D72uc@cluster0.ci8azls.mongodb.net/foreverDB?retryWrites=true&w=majority'
//      );
//      const db = client.db();
//      const cartCollection = db.collection('carts');
//      let selectedCart;
//      if(cartCollection){
//         //  selectedCart = await cartCollection.findOne({userId: SETTINGS.currentUser});
//         selectedCart = await cartCollection.find().toArray();
//      }
//      client.close();
//      return {
//          props: {
//             // cart: selectedCart ? 
//             //     {
//             //         id: selectedCart._id.toString(),
//             //         userId: selectedCart.userId,
//             //         currency: selectedCart.currency,
//             //         products: selectedCart.products,
//             //     }
//             //     :
//             //     null,
//             carts: selectedCart.map((cart) => ({
//                 id: cart._id.toString(),
//                 userId: cart.userId,
//                 currency: cart.currency,
//                 products: cart.products,
//             }))
            
//         },
//          revalidate: 10
//      }
//  }

export default CartPage;