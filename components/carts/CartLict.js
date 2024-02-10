import { useEffect, useState } from 'react';
import CartItem from './CartItem';
import classes from './CartList.module.css';
import SETTINGS from '@/data/settings';
import AppContext from "@/AppContext";
import { useContext } from "react";

function CartList(props) {
    
    const value = useContext(AppContext);
    let { translateObj, language, userCart } = value.state;
    
    let textAlign ;
    language === 'en' ? textAlign = 'left' : textAlign= 'right';
    let curr = '';
    let shippingCost = 0;
    
    if(props.cart.currency){
        curr = language === 'en' ? props.cart.currency.curEn : props.cart.currency.curAr;
      
        switch(props.cart.currency.code){
            case 'SA': shippingCost = Number(SETTINGS.shippingCostSa); break;
            case 'QA': shippingCost = Number(SETTINGS.shippingCostQa); break;
            case 'BH': shippingCost = Number(SETTINGS.shippingCostBh); break;
            case 'AE': shippingCost = Number(SETTINGS.shippingCostAe); break;
            case 'KW': shippingCost = Number(SETTINGS.shippingCostKw); break;
            case 'OM': shippingCost = Number(SETTINGS.shippingCostOm); break;
            default  : shippingCost = Number(SETTINGS.shippingCostSa); break;
        }
    }

    const [products, setProducts] = useState(props.cart.products ? props.cart.products : []);
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState({});
    const [disabled, setDisabled] = useState(false);
    
    useEffect(() => {
        let prods = [];
        products.map((product) => {
            prods.push(product)
        });
        let sum = 0;
        prods.map((product) => {
            if(product.titleEn === quantity.titleEn && product.quantity !== quantity.quantity ){
                product.quantity = quantity.quantity;
            }
        });
        setProducts(prods);
        
        products.map((product) => {
            sum += (parseInt(product.quantity) * parseFloat(product.price));
        });
        sum += parseInt(shippingCost);
        sum = (sum).toFixed(2);
        setTotal(sum);
    },[quantity])
    
    return(
        products.length === 0 ? 
            <div className={classes.noItems}>
                {translateObj.noCart}
            </div>
            :
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
                            passChildData={setQuantity}
                            setDisabled={setDisabled}/>
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
                                <h3>{shippingCost} {curr}</h3>
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
                        <button className={classes.buttoncart} 
                                disabled={disabled}
                                onClick={props.order}>
                        {translateObj.order}
                        </button>
                        {/* <a href='https://web.whatsapp.com/' target='_blank' rel='noreferrer'>
                            <button className={classes.buttonwhatsup} onClick={console.log('whatsapp')}>{translateObj.orderViaWhatsApp}</button>
                        </a> */}
                    </li>
                </ul>
            </div>

    )
}

export default CartList;