import classes from './OrderFormComponent.module.css';
import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import AppContext from "@/AppContext";
import Card from '../ui/Card';
import { Sa, Qa, Kw, Bh, Om, Ae } from "react-flags-select";

function OrderFormComponent() {
    
    const router = useRouter();
    const value = useContext(AppContext);
    let { translateObj, language, userCart, currentUser, ordersCount, userOrders, allOrders, allCarts } = value.state;

    const [flag, setFlag] = useState(<Sa/>);
    const [code, setCode] = useState('+966');
    const [customer, setCustomer] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if(userCart.currency){
            switch(userCart.currency.code){
                case 'SA': setFlag(<Sa/>); setCode('+966'); break;
                case 'QA': setFlag(<Qa/>); setCode('+974'); break;
                case 'BH': setFlag(<Bh/>); setCode('+973'); break;
                case 'AE': setFlag(<Ae/>); setCode('+971'); break;
                case 'KW': setFlag(<Kw/>); setCode('+965'); break;
                case 'OM': setFlag(<Om/>); setCode('+968'); break;
                default  : setFlag(<Sa/>); setCode('+966'); break;
            }
        }
    }, []);
    
    
    async function addOrderHandler(enteredData){
        const response = await fetch('/api/new-order', {
            method: 'POST',
            body: JSON.stringify(enteredData),
            header: {
                'Content/Type': 'application/json'
            }
        });
        const data = await response.json();
    }
    async function updateSalesCountHandler(enteredData){
        const response = await fetch('/api/new-product', {
            method: 'POST',
            body: JSON.stringify(enteredData),
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
   
    function orderHandler(event) {
        
        event.preventDefault();
        let prods = [];
        
        if(userCart.products){
            userCart.products.map(product => {if(Number(product.quantity) !== 0) prods.push(product);});
            const enteredData ={
                userId: currentUser,
                date: new Date(),
                products: prods,
                currency: userCart.currency,
                status: 'In progress',
                customer: customer,
                address: address,
                phone: phone,
                }
            
            //update sales count
            prods.map(pro =>{
                const productData ={
                    titleId: pro.titleEn,
                    quantity: pro.quantity
                }
                updateSalesCountHandler(productData);
            })
            //add order
            addOrderHandler(enteredData); 
            //delete cart
            deleteCartHandler(enteredData);
            //refresh cart icon
            value.setCartItemsCount(0);
            //refresh user cart 
            value.setUserCart({});
            let allCrts = allCarts;
            allCarts.map(c => {if(c.userId !== currentUser) allCrts.push(c)});
            value.setAllCarts(allCrts);
            //refresh orders icon
            value.setOrdersCount(Number(ordersCount) + 1);
            //refresh user orders 
            let ords = userOrders;
            ords.push(enteredData);
            value.setUserOrders(ords);
            let allOrds = allOrders;
            allOrds.push(enteredData);
            value.setAllOrders(allOrds);
            //rediect to orders page   
            let path;
            path = '/orders' ;
            router.push(path);
            console.log(enteredData);
        }
    }

    return (
        <div className={classes.main}>
            <div className={classes.submain}>
                <Card>
                    <form className={classes.form}
                            onSubmit={orderHandler}
                            >
                        <div className={classes.control} >
                            <input type='text' required
                                   className={classes.input} 
                                   value={customer}
                                   placeholder={translateObj.customerHint}
                                   onChange={e => {setCustomer(e.target.value);}}
                                />
                        </div>
                        <div className={classes.control}>
                            <textarea type='text' required
                                      className={classes.input}
                                      style={{height: '5rem'}}
                                      value={address}
                                      placeholder={translateObj.addressHint}
                                      onChange={e => {setAddress(e.target.value);}}
                                />
                        </div>
                        <div className={classes.control} style={{display: 'flex', flexDirection: 'row'}}>
                            <div style={language === 'en' 
                                        ? 
                                        {padding: '0.25rem', display: 'flex', justifyContent: 'center', alignItems: 'start', fontSize: '1.8rem', marginRight: '0.5rem'} 
                                        :
                                        {padding: '0.25rem', display: 'flex', justifyContent: 'center', alignItems: 'start', fontSize: '1.8rem', marginLeft: '0.5rem'}}>
                                {flag}
                            </div>
                            <div style={language === 'en' ? {marginRight: '0.5rem'} : {marginLeft: '0.5rem'}}>
                                {code}
                            </div>
                            <input  type= 'text'  
                                    required
                                    inputmode="numeric"
                                    maxlength='10'
                                    className={classes.input}
                                    value={phone}
                                    placeholder={translateObj.phoneHint}
                                    onChange={e => {setPhone(e.target.value);}}
                                />
                        </div>
                        <button className={classes.button}>{translateObj.order}</button>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default OrderFormComponent;