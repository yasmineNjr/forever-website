import classes from './Footer.module.css';
// import DUMMY_PRODUCTS from '@/data/products';
// import DUMMY_GROUPS from '@/data/groups';
import ProductFooterList from '../products/ProductFooterList';
import { FaFacebook, FaInstagram, FaPinterest, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { useContext } from "react";
import AppContext from "@/AppContext";

// const DUMMY_BEST_PRODUCTS = [
//     {
//         id: 'p1',
//         title: 'Forever Aloe Vera Gel',
//         image: 'https://cdn.foreverliving.com/content/products/images/ALOE_VERA_GEL__pd_main_512_X_512_1617785242148.png',
//         description: 'Forever Aloe Vera Gel is a sugar-free drink made from the pure gel from the inner leaf of the aloe vera plant. And also important: no preservatives are added during the processing process, only vitamin C. In addition, the drink is gluten-free. This Aloe Vera Gel is therefore a healthy addition to a balanced diet.',
//         price: '$10',
//     },
//     {
//         id: 'p2',
//         title: 'Forever Therm',
//         image: 'https://static.wixstatic.com/media/b7a980_44a00e861d98417489bc4d5dec9a2c7e~mv2.jpg/v1/fill/w_544,h_540,al_c/b7a980_44a00e861d98417489bc4d5dec9a2c7e~mv2.jpg',
//         description: 'Forever Therm ™ is a fat burner that contains plant extracts (green tea, green coffee, Guarana) associated with B vitamins and vitamin C. It helps maintain and control weight, lower fat , increase fat oxidation and reduce fatigue.',
//         price: '$7',
//     },
//     {
//         id: 'p3',
//         title: 'Forever Lean',
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtnNuAepdNPOybjKeKFhiz0166sATRawnA2g&usqp=CAU',
//         description: 'Forever Lean™ is a dietary supplement with extract of Indian fig and white kidney beans, and also contains chromium, which contributes to the maintenance of normal blood glucose levels.',
//         price: '$10',
//     },
// ];

// const DUMMY_LATEST_PRODUCTS = [
//     {
//         id: 'p2',
//         title: 'Forever Therm',
//         image: 'https://static.wixstatic.com/media/b7a980_44a00e861d98417489bc4d5dec9a2c7e~mv2.jpg/v1/fill/w_544,h_540,al_c/b7a980_44a00e861d98417489bc4d5dec9a2c7e~mv2.jpg',
//         description: 'Forever Therm ™ is a fat burner that contains plant extracts (green tea, green coffee, Guarana) associated with B vitamins and vitamin C. It helps maintain and control weight, lower fat , increase fat oxidation and reduce fatigue.',
//         price: '$7',
//     },
//     {
//         id: 'p3',
//         title: 'Forever Lean',
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtnNuAepdNPOybjKeKFhiz0166sATRawnA2g&usqp=CAU',
//         description: 'Forever Lean™ is a dietary supplement with extract of Indian fig and white kidney beans, and also contains chromium, which contributes to the maintenance of normal blood glucose levels.',
//         price: '$10',
//     },
// ]

function Footer(props) {
    //console.log(props);
    const value = useContext(AppContext);
    let { translateObj , language, screenSize } = value.state;
    let paddingRight;
    let paddingLeft;
    language === 'en' ? paddingRight = '1.5rem' : paddingLeft = '1.5rem' ;
    // let productsForSalesCount = DUMMY_PRODUCTS.concat(DUMMY_GROUPS);
    let productsForSalesCount = [];
    props.products.map(prod => productsForSalesCount.push(prod));
    // let productsForLatestDate = DUMMY_PRODUCTS.concat(DUMMY_GROUPS);
    let productsForLatestDate = [];
    props.products.map(prod => productsForLatestDate.push(prod));
    // let productsForHighestRated = DUMMY_PRODUCTS.concat(DUMMY_GROUPS);
    let productsForHighestRated = [];
    props.products.map(prod => productsForHighestRated.push(prod));
    /////////////////
    productsForSalesCount.sort((x,y) => Number(y.salesCount) - Number(x.salesCount));
    const DUMMY_BEST_PRODUCTS = productsForSalesCount.splice(0,3);
    ////////////////
    productsForLatestDate.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });
    const DUMMY_LATEST_PRODUCTS = productsForLatestDate.splice(0,3);
    ///////////////
    productsForHighestRated.sort((x,y) => y.rate - x.rate);
    const DUMMY_HIEGHEST_RATED = productsForHighestRated.splice(0,3);
      
    return(
        <div className={classes.header}>
            <div className={classes.logo}>
                <p style={{paddingRight: paddingRight, paddingLeft: paddingLeft}}>
                    {translateObj.logo}
                </p>
                <img src='/images/Forever-Living-Products-logo.jpg' alt='logo' />
                <div>
                    <ul className={classes.ul}>
                        <li className={classes.li} style={language === 'en' ? {marginLeft: '0rem' } : {marginLeft: '0.5rem' } }>
                            <FaFacebook color='#657415' size={screenSize > 500 ? '1.2rem' : '1rem'}/>
                        </li>
                        <li className={classes.li}>
                            <FaInstagram color='#657415' size={screenSize > 500 ? '1.2rem' : '1rem'}/>
                        </li>
                        <li className={classes.li}>
                            <FaPinterest color='#657415' size={screenSize > 500 ? '1.2rem' : '1rem'}/>
                        </li>
                        <li className={classes.li}>
                            <FaTelegram color='#657415' size={screenSize > 500 ? '1.2rem' : '1rem'}/>
                        </li>
                        <li className={classes.li}>
                            <FaWhatsapp color='#657415' size={screenSize > 500 ? '1.2rem' : '1rem'}/>
                        </li>
                        <li className={classes.li}>
                            <FiMail color='#657415' size={screenSize > 500 ? '1.2rem' : '1rem'}/>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={classes.logo}>
                <h1>{translateObj.bestSellers}</h1>
                <ProductFooterList products={DUMMY_BEST_PRODUCTS}/>
            </div>
            <div className={classes.logo}>
                <h1>{translateObj.latestProducts}</h1>
                <ProductFooterList products={DUMMY_LATEST_PRODUCTS}/>
            </div>
            <div className={classes.logo}>
                <h1>{translateObj.highestRated}</h1>
                <ProductFooterList products={DUMMY_HIEGHEST_RATED}/>
            </div>
        </div>
    );
}

export default Footer;