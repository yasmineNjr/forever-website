import { MongoClient} from "mongodb";
import OrdersList from "@/components/orders/OrdersList";
import { Fragment } from "react";
import Head from "next/head";
import AppContext from "@/AppContext";
import { useContext } from "react";

function OrdersPage(props) {
    
    const value = useContext(AppContext);
    let { translateObj, currentUser } = value.state;
    
    let orders = [];
    props.orders.map(c => {if(c.userId === currentUser){
        orders.push(c);
    } });
    
    value.setActivePath('/orders');
    return  (
        <Fragment>
             <Head>
                <title>{translateObj.orders}</title>
                <meta name='description' content={translateObj.ordersDescription}/>
            </Head>
            <OrdersList orders={orders} path={props.path}/> 
            {/* <div>orders</div> */}
        </Fragment>
    )
}
export async function getStaticProps(){
   //fetch data from API
   const client = await MongoClient.connect(
    'mongodb+srv://foreverUser:PwDV1m7yVI0D72uc@cluster0.ci8azls.mongodb.net/foreverDB?retryWrites=true&w=majority'
    );
    const db = client.db();
    const ordersCollection = db.collection('orders');
    const orders = await ordersCollection.find().toArray();
    client.close();
    return {
        props: {
            orders: orders.map((order) => ({
                id: order._id.toString(),
                userId: order.userId,
                currency: order.currency,
                date: order.date,
                status: order.status,
                products: order.products,
                customer: order.customer,
                address: order.address,
                phone: order.phone,
            })),
            path: '/orders/'
        },
        revalidate: 10
    }
}

export default OrdersPage;