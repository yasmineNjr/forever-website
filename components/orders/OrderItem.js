import classes from './OrderItem.module.css';
import ProductListForOrders from './ProductListForOrders';
import AppContext from "@/AppContext";
import { useContext } from "react";
import { Sa, Qa, Kw, Bh, Om, Ae } from "react-flags-select";

function OrderItem(props) {
    
    const value = useContext(AppContext);
    let { translateObj, language, screenSize } = value.state;
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
                {/* <div className={classes.order} style={screenSize > 500 ? {flexDirection: 'row'} : {flexDirection: 'column'}}> */}
                <div className={{flexDirection: 'column'}}>
                    {/* <div className={classes.title}>
                        <h3>#{props.id}</h3>
                    </div> */}
                    {/* <div className={classes.status} style={screenSize > 500 ? {textAlign: 'center', justifyContent: 'center'} : {textAlign: 'left'}}> */}
                    <div className={classes.status} style={{textAlign: 'left'}}>
                        <h3>{status}</h3>
                    </div>
                    {/* <div className={classes.date} style={screenSize > 500 ? {textAlign: 'right', justifyContent: 'flex-end'} : {textAlign: 'left'}}> */}
                    <div className={classes.date} style={{textAlign: 'left', width: '100%'}}>
                        <h3>{date}</h3>
                    </div>
                    <div className={classes.title}>
                        <h3>{props.customer}</h3>
                    </div>
                    <div className={classes.title}>
                        <h3>{props.address}</h3>
                    </div>
                    <div className={classes.title} style={{}}>
                        <div style={language === 'en' 
                                    ? 
                                    {display: 'flex', justifyContent: 'center', alignItems: 'start', fontSize: '1.8rem', marginRight: '0.5rem'} 
                                    :
                                    {display: 'flex', justifyContent: 'center', alignItems: 'start', fontSize: '1.8rem', marginLeft: '0.5rem'}}>
                            <Sa/>
                        </div>
                        <div style={language === 'en' ? {marginRight: '0.5rem', marginTop: '0.5rem'} : {marginLeft: '0.5rem', marginTop: '0.5rem'}}>
                            <h3>+961</h3>
                        </div>
                        <div style={language === 'en' ? {marginRight: '0.5rem', marginTop: '0.5rem'} : {marginLeft: '0.5rem', marginTop: '0.5rem'}}>
                            <h3>{props.phone}</h3>
                        </div>
                    </div>
                </div>
                <div className={classes.product}>
                    <ProductListForOrders products={props.products}/>
                </div>
                <div className={classes.content}>
                    <h2>{total} {curr}</h2>
                </div>
            </div>
        </div>
    )
}

export default OrderItem;