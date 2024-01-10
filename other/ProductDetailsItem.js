import classes from './ProductDetailsItem.module.css';
import { useRouter } from 'next/router';

function ProductDetailsItem(props) {
    
    const router = useRouter();
    function clickHandler() {
        let path;
        path = props.id.includes('g') ? '/groups/' : '/products/';
        router.push(path+ props.id);
    }

    return(
        <li className={classes.item} onClick={clickHandler}>
            <div className={classes.image}>
                <img src={props.image} alt={props.title} />
            </div>
            <div className={classes.content}>
                <h3>{props.title}</h3>
                <h4>{props.price}</h4>
            </div>   
        </li>
    )
}

export default ProductDetailsItem;