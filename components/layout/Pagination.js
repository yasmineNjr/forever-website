import classes from './Pagination.module.css';
import AppContext from "@/AppContext";
import { useContext } from "react";

function Pagination (props){

    const value = useContext(AppContext);
    let { translateObj, language } = value.state;
    const next = '>>';
    const previous = '<<';

    return <div className={classes.header}>
        <div className={classes.buttons}>
            <button className={classes.buttoncart} onClick={props.previousHandler}>{previous}</button>
        </div>
        <div className={classes.buttons}>
            <button className={classes.buttoncart} onClick={props.nextHandler}>{next}</button>
        </div>
    </div>
}

export default Pagination;