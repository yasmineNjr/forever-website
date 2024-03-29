import { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating'
import classes from './ProductDetails.module.css';
import Link from 'next/link';
import Quantity from '../ui/Quantity';
import AppContext from "@/AppContext";
import { useContext } from "react";
import { useRouter } from 'next/router';
import ReactFlagsSelect from "react-flags-select";
import Card from '../ui/Card';

function ProductDetails(props) {
    // console.log(props);
    const value = useContext(AppContext);
    let { translateObj, language, currency, screenSize, currentUser } = value.state;
    
    let title, department, description; 
    if(language === 'en'){
        title = props.titleEn;
        department = props.departmentEn;
        description = props.descriptionEn;
    } else{
        title = props.titleAr;
        department = props.departmentAr;
        description = props.descriptionAr;
    } 

    const router = useRouter();
    const [selected, setSelected] = useState(currency.code);
    const [selectedCurrency, setSelectedCurrency] = useState(currency);
    const [price, setPrice] = useState(props.price.sa);
    const [status, setStatus] = useState('');
    
    useEffect(() => {
       
        setSelectedCurrency(currency);
        setSelected(currency.code);
        if(currency.code === 'SA'){ setPrice(props.price.sa);}
        else if(currency.code === 'SA'){ setPrice(props.price.qa); }
        else if(currency.code === 'BH'){ setPrice(props.price.bh); }
        else if(currency.code === 'AE'){ setPrice(props.price.ae); }
        else if(currency.code === 'KW'){ setPrice(props.price.kw); }
        else if(currency.code === 'OM'){ setPrice(props.price.om); }
        if(props.cart.currency && props.cart.currency.code !== currency.code){
            setStatus('different');
        }else{
            setStatus('');
        }

    }, [currency]);

    const curr = [
         {'code': 'SA', 'curEn': 'SR', 'curAr': 'ر.س'},
         {'code': 'QA', 'curEn': 'QR', 'curAr': 'ر.ق'},
         {'code': 'KW', 'curEn': 'KD', 'curAr': 'د.ك'},
         {'code': 'BH', 'curEn': 'BD', 'curAr': 'د.ب'},
         {'code': 'OM', 'curEn': 'OR', 'curAr': 'ر.ع'},
         {'code': 'AE', 'curEn': 'AED', 'curAr': 'د.إ'},
    ];
    const selectedHandler = (code) => {
        
        setSelectedCurrency(curr.find(cur => cur.code === code)); 
        if(props.cart.currency.code !== curr.find(cur => cur.code === code).code)
            setStatus('different');
        else
            setStatus('');
        if(code === 'SA'){ setPrice(props.price.sa);}
        else if(code === 'SA'){ setPrice(props.price.qa); }
        else if(code === 'BH'){ setPrice(props.price.bh); }
        else if(code === 'AE'){ setPrice(props.price.ae); }
        else if(code === 'KW'){ setPrice(props.price.kw); }
        else if(code === 'OM'){ setPrice(props.price.om); }
        
    }
    //////////refresh cart icon////////////
    let sum = 0;
    const [qty, setQty] = useState(1);
    function plusHandler(){
        let q = qty;
        q++;
        setQty(q);
    }
    function minusHandler(){
        let q = qty;
        if(q > 1){
            q--;
            setQty(q);
        }
    }
    
    //////////Rating///////////
    const [rating, setRating] = useState(props.rate);
    async function updateRate(enteredProductData){
        const response = await fetch('/api/new-product', {
            method: 'POST',
            body: JSON.stringify(enteredProductData),
            header: {
                'Content/Type': 'application/json'
            }
        });
        const data = await response.json();
    }
    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
        // other logic
        if(props.titleId){
            let newRate ;
            newRate = (Number(props.rate) + Number(rate));
            if(Number(props.rate) !== 0){
                newRate = newRate / 2;
            }
            
            const enteredProductData ={
                titleId: props.titleId,
                rate: newRate
            }
            updateRate(enteredProductData);
        }
    }
    // Optinal callback functions
    const onPointerEnter = () => { 
        //console.log('Enter'); 
    }
    const onPointerLeave = () => { 
        //console.log('Leave'); 
    }
    const onPointerMove = (value, index) => { 
        //console.log(value, index); 
    }

    ///////////Cart//////////////
    const [cart, setCart] = useState(props.cart);
    async function addCartHandler(enteredCartData){
        const response = await fetch('/api/new-cart', {
            method: 'POST',
            body: JSON.stringify(enteredCartData),
            header: {
                'Content/Type': 'application/json'
            }
        });
        const data = await response.json();
        //console.log(data);
    }
    function addToCartHandler(){
        if(props.cart.currency && props.cart.currency.code === selectedCurrency.code){
            const product = props.cart.products.find(product => product.titleEn === props.titleId);
            if(product){
                let prods = [];
                props.cart.products.map(prod =>  {if(prod !== product) prods.push(prod);});
                prods.push( { id: product.id, titleEn: product.titleEn, titleAr: product.titleAr, price: product.price, quantity: (Number(product.quantity)+qty).toString()})
                const enteredCartData ={
                    userId: currentUser,
                    currency: selectedCurrency,
                    products: prods
                    }
                addCartHandler(enteredCartData);
                value.setUserCart(enteredCartData);
                setCart(prods);
                prods.map(p => {sum += Number(p.quantity);});
                value.setCartItemsCount(sum);
            }else {
                let prods = [];
                props.cart.products.map(product => prods.push(product));
                prods.push( { id: props.id, titleEn: props.titleEn, titleAr: props.titleAr, price: price, quantity: qty.toString()})
                const enteredCartData ={
                    userId: currentUser,
                    currency: selectedCurrency,
                    products: prods
                    }
                addCartHandler(enteredCartData);
                prods.map(p => {sum += Number(p.quantity);});
                value.setCartItemsCount(sum);
                value.setUserCart(enteredCartData);
                //console.log(enteredCartData);
            }
            // console.log('same');
        }else if(props.cart.currency && props.cart.currency.code !== selectedCurrency.code){
            setStatus('different');
            // console.log('different');
        }else {
            const enteredCartData ={
                                    userId: currentUser,
                                    currency: selectedCurrency,
                                    products: [
                                                {   id: props.id, 
                                                    titleEn: props.titleEn, 
                                                    titleAr: props.titleAr, 
                                                    price: price, 
                                                    quantity: qty.toString()
                                                },
                                            ]
            }
            addCartHandler(enteredCartData);
            value.setCartItemsCount(qty);
            value.setUserCart(enteredCartData);
            // console.log('no cart');
        }
        //rediect to orders page   
        // let path;
        // path = '/cart/' ;
        // router.push(path);
    }

    return(
            <div className={classes.details}>
                <img
                    src={props.image}
                    alt={title}/>
                <div className={classes.subContainer}>
                    <h2>{title}</h2>
                    <h3>{department}</h3>
                    <div style={{ display: 'flex', flexDirection: 'row'}}>
                        <ReactFlagsSelect
                            countries={["SA", "QA", "BH", "AE", "OM", "KW"]}
                            selected={selected}
                            onSelect={(code) => {setSelected(code); selectedHandler(code);}}
                            selectedSize={14}
                            showSelectedLabel={false}
                            showOptionLabel={false}
                            />
                        <div style={{marginRight: '10px', marginLeft: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <h1>{price} {language === 'en'
                                ? 
                                selectedCurrency ? selectedCurrency.curEn : 'RS'
                                : 
                                selectedCurrency ? selectedCurrency.curAr : 'ر.س'
                                }
                            </h1>
                        </div>
                    </div>
                    <Rating
                        size={screenSize > 500 ? '25' : '22'}
                        fillColor='#DEB920'
                        iconsCount={5}
                        initialValue={rating}
                        onClick={handleRating}
                        onPointerEnter={onPointerEnter}
                        onPointerLeave={onPointerLeave}
                        onPointerMove={onPointerMove}
                        /* Available Props */
                    />
                    <div className={classes.description}><p>{description}</p></div>
                    {props.ingredients.length !== 0 && props.ingredients !== 'none' && 
                        <div>
                            <div className={classes.ingredients}>{translateObj.ingredients}</div>
                            <ul className={classes.ul}>
                                {
                                    props.ingredients.map((ingredient) => {
                                        const productId = ingredient.en;
                                        const linkPath = `/products/${productId}`;
                                        return <li className={classes.li} key={ingredient.en}>
                                                <Link href={linkPath}>
                                                    {language === 'en' ? ingredient.en : ingredient.ar}
                                                </Link>
                                            </li>
                                    })
                                }
                            </ul>
                        </div>
                    } 
                    {props.groups.length !== 0 && props.groups !== 'none' &&
                    <div>
                        <text className={classes.ingredients}>{translateObj.groups}</text>
                        <ul className={classes.ul}>
                            {
                                props.groups.map((group) => {
                                    const productId = group.en;
                                    const linkPath = `/groups/${productId}`;
                                    return <li className={classes.li} key={group.en}>
                                            <Link href={linkPath}>
                                                {language === 'en' ? group.en : group.ar}
                                            </Link>
                                        </li>
                                })
                            }
                        </ul>
                    </div>
                    }
                    <div className={classes.buttons}>
                        <Quantity qty={qty} plusHandler={plusHandler} minusHandler={minusHandler}/>
                        <div >
                            <button className={classes.buttoncart} 
                                    onClick={addToCartHandler}
                                    disabled={currentUser === '' || status === 'different'}
                                    >
                                        {translateObj.addToCart}
                            </button>
                        </div>
                        {/* <a href='https://web.whatsapp.com/' target='_blank' rel='noreferrer'>
                            <button className={classes.buttonwhatsup}>{translateObj.buyViaWhatsApp}</button>
                        </a> */}
                    </div>
                    {
                        currentUser === '' &&
                        <div className={classes.warningdiv}>
                            {translateObj.loginToAddToCart}
                        </div>
                    }
                    {
                        status === 'different' &&
                        <div className={classes.warningdiv}>
                            {translateObj.differentCurrencies}
                        </div>
                    }
                </div>
            </div>
    );
}

export default ProductDetails;