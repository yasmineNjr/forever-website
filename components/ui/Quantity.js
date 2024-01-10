import { useState } from 'react';
import classes from './Quantity.module.css';
import AppContext from "@/AppContext";
import { useContext } from "react";

function Quantity(props) {

  const value = useContext(AppContext);
    let { language } = value.state;

    let alignItems;
    let justifyContent;
    let borderRightMinus, marginLeftMinus, borderLeftMinus, marginRightMinus;
    let borderRightQty, borderLeftQty;
    let marginRightPlus, marginLeftPlus;
    if(language === 'en'){
      alignItems = 'left'; justifyContent = 'left';
      borderRightMinus = '0', marginLeftMinus = '0';
      borderRightQty = '0'; 
      marginRightPlus = '1rem';
    }else{
      alignItems = 'right'; justifyContent = 'right';
      borderLeftMinus = '0'; marginRightMinus = '0';
      borderLeftQty = '0'; 
      marginLeftPlus = '1rem';
    }
    
  return <div className={classes.buttons} style={{ alignItems: alignItems, justifyContent:justifyContent }}>
        <button className={classes.qtyminus} 
                style={{
                  borderRight: borderRightMinus,
                  marginLeft: marginLeftMinus,
                  borderLeft: borderLeftMinus,
                  marginRight: marginRightMinus
                }} 
                onClick={props.minusHandler}
                >-</button>
        <button className={classes.qtyquantity}
                style={{borderRight: borderRightQty, borderLeft: borderLeftQty}}
                >{props.qty}</button>
        <button className={classes.qtyplus}
                style={{marginRight: marginRightPlus, marginLeft: marginLeftPlus}} 
                onClick={props.plusHandler}
                >+</button>
  </div>;
}

export default Quantity;