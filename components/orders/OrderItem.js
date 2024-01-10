import classes from './OrderItem.module.css';
import ProductListForOrders from './ProductListForOrders';
import AppContext from "@/AppContext";
import { useContext } from "react";

function OrderItem(props) {
    // console.log(props.currency);
    const value = useContext(AppContext);
    let { translateObj, language } = value.state;
    const dateFormat = translateObj.dateFormat;
    let status , curr;
    if(props.status === 'In progress')
        status = translateObj.inProgress
    curr = language === 'en' ? props.currency.curEn : props.currency.curAr;
    const products = props.products;
    let total = 0;
    products.map(product => total += Number(product.price) * Number(product.quantity) );
    const date = new Date(props.date).toLocaleDateString(dateFormat, {//ar-eg//en-US
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    return(
        <div className={classes.item} >
            <div className={classes.card}>
                <div className={classes.order}>
                    <div className={classes.title}>
                        <h3>#{props.id}</h3>
                    </div>
                    <div className={classes.status}>
                        <h3>{status}</h3>
                    </div>
                    <div className={classes.date}>
                        <h3>{date}</h3>
                    </div>
                </div>
                <div className={classes.content}>
                    <h2>{total} {curr}</h2>
                </div>
                <div className={classes.product}>
                    <ProductListForOrders products={props.products}/>
                </div>
            </div>
        </div>
    )
}

export default OrderItem;