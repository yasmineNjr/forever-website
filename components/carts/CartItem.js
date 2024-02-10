import { useEffect, useState } from 'react';
import classes from './CartItem.module.css';
import Quantity from '../ui/Quantity';
import { MdClose } from 'react-icons/md';
// import DUMMY_CART from '@/data/cart';
import AppContext from "@/AppContext";
import { useContext } from "react";

function CartItem(props) {
    
    const propsQty = props.qty;
    const [qty, setQty] = useState(propsQty);
    const [total, setTotal] = useState((propsQty * parseFloat(props.price)).toFixed(2));
    //////////refresh cart icon////////////
    const value = useContext(AppContext);
    let { cartItemsCount, language, currentUser, userCart } = value.state;
    let alignItems , title, curr, textAlign;
    if(language === 'en'){
        alignItems = 'left';
        textAlign = 'left';
        title = props.titleEn;
        if( props.cart.currency)
            curr = props.cart.currency.curEn;
    }else{
        alignItems = 'right';
        textAlign= 'right';
        title = props.titleAr;
        if( props.cart.currency)
            curr = props.cart.currency.curAr;
    }

    function plusHandler(){
        let q = qty;
        q++;
        setQty(q);
        setTotal((q * parseFloat(props.price)).toFixed(2));
        props.passChildData({titleEn: props.titleEn, titleAr: props.titleAr ,quantity: q});
        //refresh cart icon
        value.setCartItemsCount(cartItemsCount + 1);
    }
    function minusHandler(){
        let q = qty;
        if(q > 1){
            q--;
            setQty(q);
            setTotal((q * parseFloat(props.price)).toFixed(2));
            props.passChildData({titleEn: props.titleEn, titleAr: props.titleAr ,quantity: q});
            //refresh cart icon
            value.setCartItemsCount(cartItemsCount - 1);
        }
    }
    async function addCartHandler(enteredCartData){
        const response = await fetch('/api/new-cart', {
            method: 'POST',
            body: JSON.stringify(enteredCartData),
            header: {
                'Content/Type': 'application/json'
            }
        });
        const data = await response.json();
    }
    async function deleteCartHandler(enteredCartData){
        const response = await fetch('/api/new-cart', {
            method: 'DELETE',
            body: JSON.stringify(enteredCartData),
            header: {
                'Content/Type': 'application/json'
            }
        });
        const data = await response.json();
    }
    function clearHandler() {
        let prods = [];
        if(props.cart.products){
            props.cart.products.map(prod =>  {if(prod.titleEn !== props.titleEn) prods.push(prod);});
            const enteredCartData ={
                userId: currentUser,
                currency: props.cart.currency,
                products: prods
                }
            if(prods.length === 0){
                 //refresh cart icon
                 value.setCartItemsCount(0);
                 value.setUserCart({});
                 props.setDisabled(true);
                //delete cart
                deleteCartHandler(enteredCartData);
            }else{
                //update cart
                addCartHandler(enteredCartData);
                //refresh cart icon
                value.setCartItemsCount(cartItemsCount - qty);
                value.setUserCart(enteredCartData);
            }
            props.passChildData({titleEn: props.titleEn, titleAr: props.titleAr, quantity: 0});
        }
        console.log(userCart);

    }
    return(
        <li className={classes.item} >
            <div className={classes.card} style={{ alignItems: alignItems}}>
                <div className={classes.clear}>
                {/* onClick={clearHandler} */}
                    <MdClose color= '#5D5D5D' size='1.25rem' onClick={clearHandler}/>
                </div>
               <div className={classes.title} style={{textAlign: textAlign}}>
                    <h3>{title}</h3>
                </div>
                <div className={classes.content} style={{textAlign: textAlign}}>
                    <h3>{props.price} {curr}</h3>
                </div>
                <div className={classes.content} style={{textAlign: textAlign}}>
                    <Quantity qty={qty} plusHandler={plusHandler} minusHandler={minusHandler}/>
                </div>
                <div className={classes.content} style={{textAlign: textAlign}}>
                    <h3>{total} {curr}</h3>
                </div>
            </div>
        </li>
    )
}

export default CartItem;