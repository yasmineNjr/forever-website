import DashboardSubItem from './DashboardSubItem';
import classes from './DashboardSubList.module.css';
import AppContext from "@/AppContext";
import { useContext } from "react";

function DashboardSubList(props) {
    
    const value = useContext(AppContext);
    let { translateObj, language } = value.state;
   
    let list = props.list; 
    
    return(
        <div>
            <ul className={classes.list} >
                {
                    list.length === 0 
                    ?
                    <div className={classes.noItems}>
                        {translateObj.noProducts}
                    </div>
                    :
                    list.map((item) => (
                        <DashboardSubItem
                            name={props.source !== 'user' 
                                        ? 
                                        language === 'en' ? item.titleEn : item.titleAr
                                        :
                                        item.firstName+' '+item.lastName+'/'+item.userName
                                        }
                            image={props.source !== 'user' ? item.image   : ''}
                            id={props.source    !== 'user' ? item.titleEn : item.userName}
                            source={props.source}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default DashboardSubList;