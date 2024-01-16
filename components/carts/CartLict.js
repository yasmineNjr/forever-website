import { useEffect, useState } from 'react';
import CartItem from './CartItem';
import classes from './CartList.module.css';
import SETTINGS from '@/data/settings';
import AppContext from "@/AppContext";
import { useContext } from "react";

function CartList(props) {
    
    const value = useContext(AppContext);
    let { translateObj, language } = value.state;
    
    let textAlign ;
    language === 'en' ? textAlign = 'left' : textAlign= 'right';
    let curr = '';
    if(props.cart !== null){
        curr = language === 'en' ? props.cart.currency.curEn : props.cart.currency.curAr;
    }

    const [products, setProducts] = useState(props.cart ? props.cart.products : []);
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState({});
    
    useEffect(() => {
        let prods = [];
        products.map((product) => {
            prods.push(product)
        });
        let sum = 0;
        prods.map((product) => {
            if(product.titleEn === quantity.titleEn && product.quantity !== quantity.quantity){
                product.quantity = quantity.quantity;
            }
        });
        setProducts(prods);
        
        products.map((product) => {
            sum += (parseInt(product.quantity) * parseFloat(product.price));
        });
        sum += parseInt(SETTINGS.shippingCost);
        sum = (sum).toFixed(2);
        setTotal(sum);
    },[quantity])
    
    if(!products){
        return (
            <div className={classes.noItems}>
                <p>Loading...</p>
            </div>
        )
        
    }
    return(
        products.length === 0 ? 
            <div className={classes.noItems}>
                {translateObj.noCart}
            </div>
            :
            <ul className={classes.list}>
                <li className={classes.item} >
                    <div className={classes.card}>
                        <div className={classes.clear}>
                            {/* <h3>Total</h3> */}
                        </div>
                        <div className={classes.title} style={{textAlign: textAlign}}>
                            <h3>{translateObj.title}</h3>
                        </div>
                        <div className={classes.content} style={{textAlign: textAlign}}>
                            <h3>{translateObj.price}</h3>
                        </div>
                        <div className={classes.content} style={{textAlign: textAlign}}>
                            <h3>{translateObj.quantity}</h3>
                        </div>
                        <div className={classes.content} style={{textAlign: textAlign}}>
                            <h3>{translateObj.sum}</h3>
                        </div>
                    </div>
                </li>
                {products.map((product) => ( 
                    product.quantity === 0 ?
                    <div></div>
                    :
                    <CartItem
                        cart={props.cart}
                        key={product.id}
                        cartId={props.cart.id}
                        id={product.id}
                        titleEn={product.titleEn}
                        titleAr={product.titleAr}
                        price={product.price}
                        qty={product.quantity}
                        passChildData={setQuantity}/>
                ))}
                <li className={classes.item} >
                    <div className={classes.card}>
                        <div className={classes.clear}>
                            {/* <h3>Total</h3> */}
                        </div>
                        <div className={classes.title} style={{textAlign: textAlign}}>
                            <h3>{translateObj.shipping}</h3>
                        </div>
                        <div className={classes.content} style={{textAlign: textAlign}}>
                            {/* <h3>Price</h3> */}
                        </div>
                        <div className={classes.content} style={{textAlign: textAlign}}>
                            {/* <h3>Quantity</h3> */}
                        </div>
                        <div className={classes.content} style={{textAlign: textAlign}}>
                            <h3>25 {curr}</h3>
                        </div>
                    </div>
                </li>
                <li className={classes.item} >
                    <div className={classes.card}>
                        <div className={classes.clear}>
                            {/* <h3>Total</h3> */}
                        </div>
                        <div className={classes.title} style={{textAlign: textAlign}}>
                            <h3>{translateObj.total}</h3>
                        </div>
                        <div className={classes.content} style={{textAlign: textAlign}}>
                            {/* <h3>Price</h3> */}
                        </div>
                        <div className={classes.content} style={{textAlign: textAlign}}>
                            {/* <h3>Quantity</h3> */}
                        </div>
                        <div className={classes.content} style={{textAlign: textAlign}}>
                            <h2>{total} {curr}</h2>
                        </div>
                    </div>
                </li>
                <li className={classes.buttons}>
                    <button className={classes.buttoncart} onClick={props.order}>{translateObj.order}</button>
                    {/* <a href='https://web.whatsapp.com/' target='_blank' rel='noreferrer'>
                        <button className={classes.buttonwhatsup} onClick={console.log('whatsapp')}>{translateObj.orderViaWhatsApp}</button>
                    </a> */}
                </li>
            </ul>
    )
}

export default CartList;