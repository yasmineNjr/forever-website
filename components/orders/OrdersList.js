import OrderItem from './OrderItem';
import classes from './OrdersList.module.css';
import AppContext from "@/AppContext";
import { useContext } from "react";

function OrdersList(props) {

    const value = useContext(AppContext);
    let { translateObj } = value.state;

    const orders = props.orders;
    // console.log(orders);
    return(
        orders.length === 0 ? 
            <div className={classes.noItems}>
                {translateObj.noOrders}
            </div>
            :
            <div className={classes.list}>
                {orders.map((order) => ( 
                    <OrderItem
                        id={order.id}
                        date={order.date}
                        currency={order.currency}
                        status={order.status}
                        products={order.products}/>
                ))}
                {/* <div>{orders.length}</div> */}
            </div>
    )
}

export default OrdersList;