import classes from './ProductItemForOrders.module.css';
import AppContext from "@/AppContext";
import { useContext } from "react";

function ProductItemForOrders(props) {

    const value = useContext(AppContext);
    let { translateObj, language } = value.state; 
    let title;
    language === 'en' ? title =props.titleEn : title = props.titleAr;
    return(
            <div className={classes.details} >
                <div className={classes.title}>
                    <h3>({props.quantity}{translateObj.piece}) {title}</h3>
                </div>
                {/* <div className={classes.title}>
                    <h3>{props.quantity} piece</h3>
                </div> */}
            </div>
    );
}

export default ProductItemForOrders;