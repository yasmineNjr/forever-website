import OrderItem from './OrderItem';
import classes from './OrdersList.module.css';
import AppContext from "@/AppContext";
import { useContext } from "react";

function OrdersList(props) {

    const value = useContext(AppContext);
    let { translateObj } = value.state;

    let orders = [];
    orders = props.orders;
    console.log(props.orders);
    return(
        // !orders ? 
        orders.length === 0 ? 
            <div className={classes.noItems}>
                {translateObj.noOrders}
            </div>
            :
            Array.isArray(orders) 
                ?
                <div className={classes.list}>
                    {orders.map((order) => ( 
                        <OrderItem
                            id={order.id}
                            date={order.date}
                            currency={order.currency}
                            status={order.status}
                            products={order.products}
                            customer={order.customer}
                            address={order.address}
                            phone={order.phone}/>
                    ))}
                    {/* <div>{orders.length}</div> */}
                </div>
                :
                <div className={classes.list}>
                    <OrderItem
                        id={orders.id}
                        date={orders.date}
                        currency={orders.currency}
                        status={orders.status}                        
                        products={orders.products}
                    />
        </div>
    )
}

export default OrdersList;