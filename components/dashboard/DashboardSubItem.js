import Card from '../ui/Card';
import classes from './DashboardSubItem.module.css';
import AppContext from "@/AppContext";
import { useContext } from "react";

function DashboardMainItem(props) {
    
    const value = useContext(AppContext);
    let { allOrders } = value.state;

    let sum = 0;
    if(props.source !== 'user'){
        allOrders.map(order => {
            order.products.map(product => {
                if(product.titleEn === props.id) sum += Number(product.price) * Number(product.quantity)
            })
        });
        sum = '$'+sum;
    }else {
        allOrders.map(order => {
            if(order.userId === props.name) sum++;        
        });
    }
   
    return(
        <li className={classes.item} >
            <Card >
                <div className={classes.content} >
                    {props.source !== 'user'? <img src={props.image} alt={props.title}/> : null}
                    <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                        <div className={classes.subContent}>
                            <strong>{props.name}</strong>
                        </div>
                        <div className={classes.subContent}>
                            <strong style={{color: '#657415'}}>{sum}</strong>
                        </div>
                    </div>
                </div>
            </Card>
        </li>
    )
}

export default DashboardMainItem;