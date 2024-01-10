import { MongoClient} from "mongodb";
import OrdersList from "@/components/orders/OrdersList";
import { Fragment } from "react";
import Head from "next/head";
import AppContext from "@/AppContext";
import { useContext } from "react";

function OrdersPage(props) {
    //console.log(props);
    const value = useContext(AppContext);
    value.setActivePath('/orders');
    return  (
        <Fragment>
             <Head>
                <title>Forever Orders</title>
                <meta name='description' content='Browse all available Forever orders.'/>
            </Head>
            <OrdersList orders={props.orders} path={props.path}/> 
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
            })),
            path: '/orders/'
        },
        revalidate: 10
    }
}

export default OrdersPage;