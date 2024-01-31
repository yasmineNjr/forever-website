import { Fragment, useContext } from "react";
import Head from "next/head";
import AppContext from "@/AppContext";
import OrderFormComponent from "@/components/orders/OrderFormComponent";

function OrdersForm() {
    
    const value = useContext(AppContext);
    let { ordersCount, translateObj, currentUser, userCart } = value.state;
    
    // let orders = props.orders.find(c => {return c.userId === currentUser});
    value.setActivePath('/orders/form');

    return  (
        <Fragment>
             <Head>
                <title>{translateObj.orders}</title>
                <meta name='description' content={translateObj.ordersDescription}/>
            </Head>
            <OrderFormComponent />
            {/* <button onClick={orderHandler}>click me</button> */}
        </Fragment>
    )
}

export default OrdersForm;