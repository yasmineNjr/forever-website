import classes from './ProductFooterItem.module.css';
import { useRouter } from 'next/router';
import { useContext } from "react";
import AppContext from "@/AppContext";

function ProductFooterItem(props) {
    
    const router = useRouter();
    const value = useContext(AppContext);
    let { language, currency } = value.state;
    let title, price ;
    title = language === 'en' ? props.titleEn : props.titleAr;
    const curr = language === 'en' ? currency.curEn : currency.curAr;
    const index = Object.keys(props.price).indexOf(currency.code.toLowerCase());
    price = Object.values(props.price)[index];
    
    function clickHandler() {
        let path ;
        if(props.ingredients.length === 0){
            path = 'products/';
        }else{
            path = 'groups/';
        }
    }

    return(
            <li className={classes.details} onClick={clickHandler}>
                <img
                    src={props.image}
                    alt={props.title}/>
                <div className={classes.subContainer}>
                    <div className={classes.title}>
                        <h2>{title}</h2>
                    </div>
                    <div className={classes.price}>
                        <h1>{price} {curr}</h1>
                    </div>
                </div>
            </li>
    );
}

export default ProductFooterItem;