import DashboardMainItem from './DashboardMainItem';
import classes from './DashboradMainList.module.css';
import AppContext from "@/AppContext";
import { useContext } from "react";

import { GoPackage } from "react-icons/go";
import { TbPackages } from "react-icons/tb";
import {IoReceiptOutline} from 'react-icons/io5';
import {AiOutlineUser} from 'react-icons/ai';

function DashboardMainList(props) {
    
    const value = useContext(AppContext);
    let { translateObj, screenSize, currentUser } = value.state;
   
    const dashboardList = [
        {
            name: translateObj.products,
            count: props.productsCount,
            profitRatio: '15',
            status: 'up', 
            icon: <GoPackage color= '#657415' size={screenSize > 500 ? '2.5rem' : '2rem'}/>,
            path: '/products'
        },
        {
            name: translateObj.groups,
            count: props.groupsCount,
            profitRatio: '25',
            status: 'up',
            icon: <TbPackages color= '#657415' size={screenSize > 500 ? '2.5rem' : '2rem'}/>,
            path: '/groups'
        },
        {
            name: translateObj.orders,
            count: props.ordersCount,
            profitRatio: '12',
            status: 'down',
            icon: <IoReceiptOutline color= '#657415' size={screenSize > 500 ? '2.5rem' : '2rem'}/>,
            path: '/orders'
        },
        {
            name: translateObj.marketers,
            count: props.usersCount,
            profitRatio: '50',
            status: 'up',
            icon: <AiOutlineUser color= '#657415' size={screenSize > 500 ? '2.5rem' : '2rem'}/>,
            path: '/user'
        },
    ]
    let lst = currentUser === 'manager' || currentUser === '' ? dashboardList : dashboardList.slice(0, 3);
    
    let list = lst;
    
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
                        <DashboardMainItem
                            name={item.name}
                            count={item.count}
                            profitRatio={item.profitRatio}
                            status={item.status}
                            icon={item.icon}
                            path={item.path}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default DashboardMainList;