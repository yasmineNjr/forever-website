import Card from '../ui/Card';
import classes from './DashboardSubItem.module.css';
import { useRouter } from 'next/router';
import AppContext from "@/AppContext";
import { useContext } from "react";

import { BsArrowDownRight } from "react-icons/bs";
import { BsArrowUpRight } from "react-icons/bs";
import { BsArrowDownLeft } from "react-icons/bs";
import { BsArrowUpLeft } from "react-icons/bs";

function DashboardMainItem(props) {
    
    const router = useRouter();
    const value = useContext(AppContext);
    let { language, screenSize } = value.state;
    
    return(
        <li className={classes.item} >
            <Card>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    {props.icon}
                    <div style={{display: 'flex', flexDirection: 'column', padding: '0.5rem'}}>
                        <h3 className={classes.content} style={ screenSize >= 500 ? {fontSize: '1rem'} : {fontSize: '0.85rem'}}>{props.name}</h3>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <h1 className={classes.content}>{props.count}</h1>
                            {
                                props.status === 'up' 
                                ?
                                <h5 style={screenSize >= 500 
                                                ? 
                                                { backgroundColor: '#006A4E', borderRadius: '6px', margin: '0.25rem', padding:'0', fontSize: '1rem', color: '#2ecc71'}
                                                :
                                                { backgroundColor: '#006A4E', borderRadius: '6px', margin: '0.25rem', padding:'0', fontSize: '0.85rem', color: '#2ecc71'}
                                                }>
                                {props.profitRatio} {language === 'en' ? <BsArrowUpRight/> : <BsArrowUpLeft/>}
                                </h5>
                                :
                                <h5 style={screenSize >= 500 
                                            ? 
                                            { backgroundColor: '#d63031', borderRadius: '6px', margin: '0.25rem', padding:'0', fontSize: '1rem', color: '#FD7272'}
                                            :
                                            { backgroundColor: '#d63031', borderRadius: '6px', margin: '0.25rem', padding:'0', fontSize: '0.85rem', color: '#FD7272'}
                                            }>
                                    {props.profitRatio} {language === 'en' ? <BsArrowDownRight/> : <BsArrowDownLeft/>}
                                </h5>
                            }
                        </div>
                    </div>
                </div>
            </Card>
        </li>
    )
}

export default DashboardMainItem;