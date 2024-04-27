import classes from './DashboardComponent.module.css';
import Card from '../ui/Card';
import AppContext from "@/AppContext";
import { useState, useContext, useEffect } from "react";
import DashboardMainList from './DashboradMainList';
import { FaCalendarAlt } from "react-icons/fa";
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = 'start';
defaults.plugins.title.font.size = 18;
defaults.plugins.title.color = '#989898';

function DashboardComponent(props) {
    
    const value = useContext(AppContext);
    let { translateObj, screenSize , allOrders, allUsers, language, currentUser } = value.state;
    
    const [selectedOption, setSelectedOption] = useState(translateObj.thisYear);

    useEffect(() => {
        setSelectedOption(translateObj.thisYear);
    } , [language]);

    // const dataLst = [
    //     {
    //         label: 'Jan',
    //         value: '100',
    //         backgroundColor: 'pink',
    //         borderColor: 'red'
    //     },
    //     {
    //         label: 'Feb',
    //         value: '78',
    //         backgroundColor: '#657415',
    //         borderColor: 'green'
    //     },
    //     {
    //         label: 'Mar',
    //         value: '92',
    //         backgroundColor: 'aqua',
    //         borderColor: 'blue'
    //     },
    // ];
    const countryLst = [
        {
            label: translateObj.saudi,
            value: '100',
            backgroundColor: '#657415',
            borderColor: 'red'
        },
        {
            label: translateObj.kuwait,
            value: '78',
            backgroundColor: '#657415',
            borderColor: 'green'
        },
        {
            label: translateObj.qatar,
            value: '92',
            backgroundColor: '#657415',
            borderColor: 'blue'
        },
        {
            label: translateObj.emirates,
            value: '75',
            backgroundColor: '#657415',
            borderColor: 'blue'
        },
        {
            label: translateObj.bahrain,
            value: '50',
            backgroundColor: '#657415',
            borderColor: 'blue'
        },
        {
            label: translateObj.oman,
            value: '95',
            backgroundColor: '#657415',
            borderColor: 'blue'
        },
    ];
    // const data2Lst = [
    //     {
    //         label: 'A',
    //         value: '40',
    //         backgroundColor: 'pink',
    //         borderColor: 'red'
    //     },
    //     {
    //         label: 'B',
    //         value: '25',
    //         backgroundColor: '#657415',
    //         borderColor: 'green'
    //     },
    //     {
    //         label: 'C',
    //         value: '70',
    //         backgroundColor: 'aqua',
    //         borderColor: 'blue'
    //     },
    // ]

    let revenueLabelLst = [];
    let revenueValueLst = [];
    let revenueLabel = '';
    let countryValueLst = [];
    //get products count and groups count
    let productsCount= 0; 
    let groupsCount= 0;
    //get orders count
    let ordersCount= 0; 
    //get users count
    let usersCount= 0;

    let orders = allOrders;
    if(currentUser !== 'manager' && currentUser !== ''){
        orders = allOrders.filter(ord => ord.userId === currentUser);
    }
    console.log(currentUser);
    // console.log(orders);
    if(selectedOption === translateObj.thisYear){
        for (let i = 0; i < 12; i++) {
            revenueValueLst[i]= 0;
        }
        for (let i = 0; i < 6; i++) {
            countryValueLst[i]= 0;
        }
        
        orders.map(order => {
            if(new Date().getFullYear() === new Date(order.date).getFullYear()){
                order.products.map(product => {
                    if(!product.titleEn.includes('group')) productsCount = productsCount + Number(product.quantity);
                    else groupsCount = groupsCount + Number(product.quantity);
                    
                    for (let i = 0; i < 12; i++) {
                        if(new Date(order.date).getMonth() === i){
                            revenueValueLst[i]+= Number(product.quantity);
                        }
                    }

                    switch(order.currency.code){
                        case 'SA': countryValueLst[0]+= Number(product.quantity); break;
                        case 'KW': countryValueLst[1]+= Number(product.quantity); break;
                        case 'QA': countryValueLst[2]+= Number(product.quantity); break;
                        case 'AE': countryValueLst[3]+= Number(product.quantity); break;
                        case 'BH': countryValueLst[4]+= Number(product.quantity); break;
                        case 'OM': countryValueLst[5]+= Number(product.quantity); break;
                    }
                    
                });
                ordersCount++;
            }
        });
        
        allUsers.map(user => {
            if(new Date().getFullYear() === new Date(user.date).getFullYear()){
                usersCount++;
            }
        })

        revenueLabel= translateObj.yearlyRevenue;
        revenueLabelLst= language === 'en'
                         ? 
                         [translateObj.january, translateObj.february, translateObj.march, translateObj.april, translateObj.may ,
                           translateObj.june, translateObj.july, translateObj.august, translateObj.september,
                           translateObj.october, translateObj.november, translateObj.december]
                         : 
                         [ translateObj.december, translateObj.november, translateObj.october, translateObj.september, 
                            translateObj.august, translateObj.july, translateObj.june, translateObj.may ,translateObj.april,
                            translateObj.march ,translateObj.february,translateObj.january]
                         ;
    }else if(selectedOption === translateObj.thisMonth){
        for (let i = 0; i < 31; i++) {
            revenueValueLst[i]= 0;
        }
        for (let i = 0; i < 6; i++) {
            countryValueLst[i]= 0;
        }
       orders.map(order => {
            if( (new Date().getFullYear() === new Date(order.date).getFullYear()) 
                && 
                (new Date().getMonth() === new Date(order.date).getMonth())){
                order.products.map(product => {
                    if(!product.titleEn.includes('group')) productsCount = productsCount + Number(product.quantity);
                    else groupsCount = groupsCount + Number(product.quantity);
                    
                    for (let i = 1; i < 32; i++) {
                        if(new Date(order.date).getDate() === i){
                            revenueValueLst[i-1]+= Number(product.quantity);
                        }
                    }

                    switch(order.currency.code){
                        case 'SA': countryValueLst[0]+= Number(product.quantity); break;
                        case 'KW': countryValueLst[1]+= Number(product.quantity); break;
                        case 'QA': countryValueLst[2]+= Number(product.quantity); break;
                        case 'AE': countryValueLst[3]+= Number(product.quantity); break;
                        case 'BH': countryValueLst[4]+= Number(product.quantity); break;
                        case 'OM': countryValueLst[5]+= Number(product.quantity); break;
                    }
                });
                ordersCount++;
            }
        });
        
        allUsers.map(user => {
            if( (new Date().getFullYear() === new Date(user.date).getFullYear())
                &&
                (new Date().getMonth() === new Date(user.date).getMonth())){
                usersCount++;
            }
        });
        
        revenueLabel= translateObj.monthlyRevenue;
        revenueLabelLst = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ,17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ];

    }else if(selectedOption === translateObj.thisDay){
        for (let i = 0; i < 24; i++) {
            revenueValueLst[i]= 0;
        }
        for (let i = 0; i < 6; i++) {
            countryValueLst[i]= 0;
        }
        orders.map(order => {

            if( (new Date().getFullYear() === new Date(order.date).getFullYear())
                &&
                (new Date().getMonth() === new Date(order.date).getMonth())
                && 
                (new Date().getDate() === new Date(order.date).getDate())){
               
                order.products.map(product => {
                    if(!product.titleEn.includes('group')) productsCount = productsCount + Number(product.quantity);
                    else groupsCount = groupsCount + Number(product.quantity);
                    
                    for (let i = 0; i < 24; i++) {
                        if(new Date(order.date).getHours() === i){
                            revenueValueLst[i]+= Number(product.quantity);
                        }
                    }

                    switch(order.currency.code){
                        case 'SA': countryValueLst[0]+= Number(product.quantity); break;
                        case 'KW': countryValueLst[1]+= Number(product.quantity); break;
                        case 'QA': countryValueLst[2]+= Number(product.quantity); break;
                        case 'AE': countryValueLst[3]+= Number(product.quantity); break;
                        case 'BH': countryValueLst[4]+= Number(product.quantity); break;
                        case 'OM': countryValueLst[5]+= Number(product.quantity); break;
                    }
                });
                ordersCount++;
            }
        });
        
        allUsers.map(user => {
            if((new Date().getFullYear() === new Date(user.date).getFullYear())
                &&
                (new Date().getMonth() === new Date(user.date).getMonth())
                && 
                (new Date().getDay() === new Date(user.date).getDay())){
                usersCount++;
            }
        });
        
        revenueLabel= translateObj.dailyRevenue;
        revenueLabelLst = [12+translateObj.am, 1+translateObj.am, 2+translateObj.am, 3+translateObj.am, 4+translateObj.am, 5+translateObj.am,
                            6+translateObj.am, 7+translateObj.am, 8+translateObj.am, 9+translateObj.am, 10+translateObj.am, 11+translateObj.am,
                            12+translateObj.pm, 1+translateObj.pm, 2+translateObj.pm, 3+translateObj.pm, 4+translateObj.pm, 5+translateObj.pm, 6+translateObj.pm, 
                            7+translateObj.pm, 8+translateObj.pm, 9+translateObj.pm, 10+translateObj.pm, 11+translateObj.pm, 12+translateObj.pm];
    }
   
    return(
        <div className={classes.main}>
                <div className={classes.control}>
                    <FaCalendarAlt size={screenSize > 500 ? '1.2rem' : '1rem'} color='#657415'/>
                    <select className={classes.input}
                            value={selectedOption}
                            onChange={e => {setSelectedOption(e.target.value);}}>
                        <option key='year'  value={translateObj.thisYear}  style={screenSize > 500 ? { fontSize: '0.85rem'} : { fontSize: '0.5rem' }}>{translateObj.thisYear}</option>
                        <option key='month' value={translateObj.thisMonth} style={screenSize > 500 ? { fontSize: '0.85rem'} : { fontSize: '0.5rem' }}>{translateObj.thisMonth}</option>
                        <option key='day'   value={translateObj.thisDay}   style={screenSize > 500 ? { fontSize: '0.85rem'} : { fontSize: '0.5rem' }}>{translateObj.thisDay}</option>
                    </select>
                </div>
            <DashboardMainList productsCount={productsCount} groupsCount={groupsCount} ordersCount={ordersCount} usersCount={usersCount}/>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '1rem'}}>
                {/* <div  style={{position: 'relative', width: '90vw', height: 'auto', margin: '1rem'}}>
                    <Card >
                        <div style={{padding: '1rem'}}>
                            <Doughnut
                                data={{
                                    labels: dataLst.map((data) => data.label),
                                    datasets: [
                                        {
                                            label: 'count',
                                            data: dataLst.map((data) => data.value),
                                            backgroundColor: dataLst.map((data) => data.backgroundColor),
                                            borderColor: dataLst.map((data) => data.borderColor),
                                        }
                                    ]
                                }}
                                options={{
                                    plugins: {
                                        title: {
                                            text: 'Revenue Sources'
                                        }
                                    }
                                }}
                            />
                        </div>
                    </Card>
                </div> */}
                <div  style={{position: 'relative', width: '90vw', height: 'auto', margin: '1rem'}}>
                    <Card >
                        <div style={{padding: '1rem', height: '25rem'}}>
                            <Line
                                data={{
                                    // labels: dataLst.map((data) => data.label),
                                    labels: revenueLabelLst,
                                    datasets: [
                                        {
                                            label: revenueLabel,
                                            data: revenueValueLst,
                                            backgroundColor: '#DEB920',
                                            borderColor: '#657415',
                                        },
                                        // {
                                        //     label: 'Cost',
                                        //     data: data2Lst.map((data) => data.value),
                                        //     backgroundColor: '#cc4bb2',
                                        //     borderColor: 'aqua',
                                        // }
                                    ]
                                }}
                                options={{
                                    responsive: true,
                                    dir: 'rtl',
                                    elements: {
                                        line: {
                                            tension: '0.5'
                                        }
                                    },
                                    plugins: {
                                        title: {
                                            text: translateObj.sales
                                        },
                                    },
                                    scales: {
                                        yAxis: {
                                            position: 'right',
                                        },
                                    }
                                }}
                            />
                        </div>
                    </Card>
                </div>
                <div  style={{position: 'relative', width: '90vw', height: 'auto', margin: '1rem'}}>
                    <Card>
                        <div style={{padding: '1rem', height: '25rem'}}>
                            <Bar
                                data={{
                                    // labels: ['A', 'B', 'C'],
                                    labels: countryLst.map((data) => data.label),
                                    datasets: [
                                        // {
                                        //     label: 'Revenue',
                                        //     data: [200, 300, 400],
                                        // },
                                        // {
                                        //     label: 'Loss',
                                        //     data: [189, 395, 276],
                                        // },
                                        {
                                            label: revenueLabel,
                                            data: countryValueLst,
                                            backgroundColor: countryLst.map((data) => data.backgroundColor),
                                            borderRadius: 5,
                                        }
                                    ]
                                }}
                                options={{
                                    plugins: {
                                        title: {
                                            text: translateObj.sales
                                        }
                                    },
                                    scales: {
                                        yAxis: {
                                            position: 'right',
                                        },
                                    }
                                }}
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default DashboardComponent;