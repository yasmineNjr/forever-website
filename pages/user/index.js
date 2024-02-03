import { MongoClient} from "mongodb";
import AppContext from "@/AppContext";
import LogInComponent from "@/components/other/LogInComponent";
import { Fragment, useContext, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

function UserPage(props) {
    const router = useRouter()
    const value = useContext(AppContext);
    const { translateObj } = value.state;
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    value.setActivePath('/user');

    async function loginUserHandler(enteredUserData){
        //validation
        setLoading(true);
        const userData = {
            userName: enteredUserData.userName,
            password: enteredUserData.password,
        };
        setTimeout(() => {setLoading(false);},10000) ;
        const response = await fetch('/api/log-in', {
            method: 'POST',
            body: JSON.stringify(userData),
            header: {
                'Content/Type': 'application/json'
            }
        });
        const data = await response.json();
        // console.log(data.message);
        const msg = data.message;
        if(msg === 'notExist'){
            setStatus('notExist');
        }else if(msg === 'notValid'){
            setStatus('notValid');
        }else if(msg === 'valid'){
            setStatus('valid');
            setTimeout(() => {
                value.setCurrentUser(userData.userName);
                let cart = props.carts.find(c => {return c.userId === userData.userName});
                value.setUserCart(cart);
                ////update cart items count for current user
                let sum = 0;
                if(cart){
                    cart.products.map(p => sum += Number(p.quantity));
                }
                value.setCartItemsCount(sum);
                ////update orders count for current user
                let orders = [];
                props.orders.map(c => {if(c.userId === userData.userName){
                    orders.push(c);
                } });
                value.setOrdersCount(orders.length);
                ////save user to local storage
                if (typeof window !== 'undefined' && window.localStorage) {
                    localStorage.setItem('currentUser', userData.userName);
                  }
                router.push('/');
            },3000) ;
        }
    }

    return (
        <Fragment>
             <Head>
                <title>{translateObj.login}</title>
                <meta name='description' content={translateObj.loginDescription}/>
            </Head>
            <LogInComponent onLogInUser={loginUserHandler} status={status} setStatus={setStatus} loading={loading}/>
        </Fragment>
    )
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
         selectedCart = await cartCollection.find().toArray();
     }
     const ordersCollection = db.collection('orders');
     let selectedOrders;
     if(ordersCollection){
      //selectedOrders = await ordersCollection.find({userId: currentUser}).toArray();
      selectedOrders = await ordersCollection.find().toArray();;
     }
     const departmentsCollection = db.collection('departments');
     let departments;
     if(departmentsCollection){
      departments = await departmentsCollection.find().toArray();;
     }
     const productsCollection = db.collection('products');
     let products;
     if(productsCollection){
      products = await productsCollection.find().toArray();;
     }
     
     client.close();
     return {
         props: {
          orders: selectedOrders.map((order) => ({
              id: order._id.toString(),
              userId: order.userId,
              date: order.date,
              status: order.status,
              products: order.products,
              customer: order.customer,
              address: order.address,
              phone: order.phone,
          })) ,
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
export default UserPage;