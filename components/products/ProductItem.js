import Card from '../ui/Card';
import classes from './ProductItem.module.css';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import AppContext from "@/AppContext";
import { useContext } from "react";

function ProductItem(props) {
    //console.log(props);
    const router = useRouter();
    const value = useContext(AppContext);
    let { language } = value.state;
    const title = language === 'en' ? props.titleEn : props.titleAr;
    
    function clickHandler() {
        
        let path = props.path;
        if(props.path === ''){
            if(props.ingredients.length === 0){
                path = 'products/';
            }else{
                path = 'groups/';
            }
        }
        router.push(path+ props.titleId);
        //console.log(props.path+ props.title);
    }

    //const linkPath = `/products/${productId}`;
    return(
        <li className={classes.item} onClick={clickHandler}>
            {/* <Link href={linkPath}> */}
                <Card>
                    <div className={classes.image}>
                        <img src={props.image} alt={title} />
                    </div>
                    <div className={classes.content}>
                        <h3>{title}</h3>
                    </div>
                </Card>
            {/* </Link> */}
        </li>
    )
}

export default ProductItem;