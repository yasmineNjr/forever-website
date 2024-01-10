import { useRef , useState } from "react";
import { useRouter } from 'next/router';
import classes from './Search.module.css';
import { FaSearch } from "react-icons/fa";
import { BsCart4} from 'react-icons/bs';
// import {LuLanguages} from 'react-icons/lu';
import {MdLanguage} from 'react-icons/md'
// import {MdDarkMode} from 'react-icons/md';//
// import {MdOutlineDarkMode} from 'react-icons/md';
// import { IoIosCart } from 'react-icons/io';//test
import {IoReceiptOutline} from 'react-icons/io5';
import {TbTruckDelivery} from 'react-icons/tb';
import {AiOutlineUser} from 'react-icons/ai';
// import DUMMY_DEPARTMENTS from "@/data/departments";
// import DUMMY_CART from "@/data/cart";
// import SETTINGS from "@/data/settings";
// import DUMMY_ORDER from "@/data/order";
import { useContext } from "react";
import AppContext from "@/AppContext";
import { NavDropdown } from "react-bootstrap";
import languageObjectEn from '../../translate/en';
import languageObjectAr from '../../translate/ar';
import ReactFlagsSelect from "react-flags-select";
import { FaHome } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { TbPackages } from "react-icons/tb";
import { GoPackage } from "react-icons/go";
import { MdSpaceDashboard } from "react-icons/md";


function Search() {

    const value = useContext(AppContext);
    let { translateObj, cartItemsCount, ordersCount, language, activePath, currentUser } = value.state;
    // console.log(activePath);
    let borderRight ;
    let borderLeft ;
    let borderTopLeftRadius;
    let borderBottomLeftRadius;
    let borderTopRightRadius;
    let borderBottomRightRadius;
    if(language === 'en'){
        borderLeft= '0'; 
        borderTopLeftRadius = '4px';
        borderBottomLeftRadius = '4px';
    }else{
        borderRight= '0';
        borderTopRightRadius = '4px';
        borderBottomRightRadius = '4px';
    }
    
    
    // let { theme } = value.state;
    // const th = theme.toString();
    // const { searchWord } = value.state;
    const [selectedOption, setSelectedOption] = useState('');
    // const [selected, setSelected] = useState("SA");
    // const selectedHandler = (code) => {
    //     let cur ;
    //     if(code === 'SA'){
    //         cur = {'code': 'SA', 'curEn': 'SR', 'curAr': 'ر.س'} ;
    //     }else if(code === 'QA'){
    //         cur = {'code': 'QA', 'curEn': 'QR', 'curAr': 'ر.ق'};
    //     }else if(code === 'BH'){
    //         cur = {'code': 'BH', 'curEn': 'BD', 'curAr': 'د.ب'};
    //     }else if(code === 'AE'){
    //         cur = {'code': 'AE', 'curEn': 'AED', 'curAr': 'د.إ'};
    //     }else if(code === 'KW'){
    //         cur = {'code': 'KW', 'curEn': 'KD', 'curAr': 'د.ك'};
    //     }else if(code === 'OM'){
    //         cur = {'code': 'OM', 'curEn': 'OR', 'curAr': 'ر.ع'};
    //     }
    //     value.setCurrency(cur);
    // }
    // const searchInputRef = useRef();
    // const cart = DUMMY_CART.find(c => c.userId === SETTINGS.currentUser);
    // const orders = DUMMY_ORDER;

    const router = useRouter();
    function homeHandler() {
        let path;
        path = '/' ;
        router.push(path);
    }
    function dashboardHandler() {
        let path;
        path = 'products/new-product' ;
        router.push(path);
    }
    function productsHandler() {
        let path;
        path = '/products' ;
        router.push(path);
    }
    function groupsHandler() {
        let path;
        path = '/groups' ;
        router.push(path);
    }
    function cartHandler() {
        let path;
        path = '/cart/' ;
        router.push(path);
    }
    function orderHandler() {
        let path;
        path = '/orders/' ;
        router.push(path);
    }
    function aboutHandler() {
        let path;
        path = '/about/' ;
        router.push(path);
    }
    return (
        <header className={classes.header}>
            <div className={classes.control}>
                <input type='text' //required id='search' ref={searchInputRef} 
                        style={{ borderLeft: borderLeft, 
                                 borderRight: borderRight, 
                                 borderTopLeftRadius: borderTopLeftRadius,
                                 borderBottomLeftRadius: borderBottomLeftRadius,
                                 borderTopRightRadius: borderTopRightRadius,
                                 borderBottomRightRadius: borderBottomRightRadius}}
                         value={selectedOption}
                         placeholder={translateObj.searchHint}
                         onChange={e => {setSelectedOption(e.target.value); value.setSearchWord(e.target.value); }}
                />
                {/* <div className={classes.search}> */}
                    {/* <FaSearch color='#989898' size='1rem'/> */}
                {/* </div> */}
            </div>
            <nav>
                <ul>
                    {currentUser === 'MANAGER' && 
                    <li>
                        <div title={translateObj.dashboard} type="button" className={classes.iconbutton}>
                            <MdSpaceDashboard color= {activePath==='products/new-product' ? '#657415' : '#989898'} size='1.3rem'  onClick={dashboardHandler}/>
                        </div>
                    </li>
                    }
                    <li>
                        <div title={translateObj.home} type="button" className={classes.iconbutton}>
                            <FaHome color= {activePath==='/' ? '#657415' : '#989898'} size='1.35rem'  onClick={homeHandler}/>
                        </div>
                    </li>
                    <li>
                        <div title={translateObj.products} type="button" className={classes.iconbutton}>
                            <GoPackage  color= {activePath==='/products' ? '#657415' : '#989898'} size='1.35rem' onClick={productsHandler}/>
                        </div>
                    </li>
                    <li>
                        <div title={translateObj.groups} type="button" className={classes.iconbutton}>
                            <TbPackages  color= {activePath==='/groups' ? '#657415' : '#989898'} size='1.35rem' onClick={groupsHandler}/>
                        </div>
                    </li>
                    <li>
                        <div title={translateObj.cart} type="button" className={classes.iconbutton}>
                            <BsCart4 color= {activePath==='/cart' ? '#657415' : '#989898'} size='1.2rem' onClick={cartHandler}/>
                            {
                                //cart.products.length > 0 && 
                                    // <span className={classes.iconbutton__badge}>{cart.products.length}</span>
                                    cartItemsCount > 0 && 
                                    <span className={classes.iconbutton__badge}>{cartItemsCount}</span>
                            }
                        </div>
                    </li>
                    <li>
                        <div title={translateObj.orders} type="button" className={classes.iconbuttondeliver}>
                            <IoReceiptOutline color={activePath==='/orders' ? '#657415' : '#989898'} size='1.2rem' onClick={orderHandler}/>
                            {/* <TbTruckDelivery color='#657415' size='1.5rem' onClick={orderHandler}/> */}
                            {
                                ordersCount > 0 &&
                                    <span className={classes.iconbutton__badge}>{ordersCount}</span>
                            }
                        </div>
                    </li>
                    <li>
                        <div title={translateObj.about} type="button" className={classes.iconbutton}>
                            <AiOutlineExclamationCircle color= {activePath==='/about' ? '#657415' : '#989898'} size='1.3rem' onClick={aboutHandler}/>
                        </div>
                    </li>
                    <li>
                        <div title={translateObj.login} type="button" className={classes.iconbutton}>
                            <AiOutlineUser color={activePath==='/user' ? '#657415' : '#989898'} size='1.2rem' onClick={cartHandler}/>   
                        </div>
                    </li>
                    {/* <li>
                        <ReactFlagsSelect
                            countries={["SA", "QA", "BH", "AE", "OM", "KW"]}
                            selected={selected}
                            onSelect={(code) => {setSelected(code); selectedHandler(code);}}
                            selectedSize={14}
                            showSelectedLabel={false}
                            showOptionLabel={false}
                            className={classes.flags}
                        />
                   </li> */}
                </ul>
            </nav>
        </header>
    );
}

export default Search;



// mongodb+srv://<username>:<password>@cluster0.ci8azls.mongodb.net/?retryWrites=true&w=majority