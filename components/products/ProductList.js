import ProductItem from './ProductItem';
import classes from './ProductList.module.css';
import AppContext from "@/AppContext";
import { useContext } from "react";
import Pagination from '../layout/Pagination';

function ProductList(props) {
    //console.log(props.products.length);
    const value = useContext(AppContext);
    let { translateObj, currentIndex } = value.state;
    let list = props.products;
    // console.log(currentIndex);
    // let height = '60rem';
    // if(props.products.length <= 4 ) {
    //     height = '20rem';
    // } else if(props.products.length > 4 && props.products.length <= 8){
    //     height = '40rem';
    // } else {
    //     height = '60rem';
    //     console.log(3);
    // } 
    // let height = '20rem';
    // if(props.products.length > 4 ){
    //     list = props.products.slice(currentIndex, 4);
    // } 
    const nextHandler = () => {
        // let i = currentIndex;
        // //if(i < props.products.length )
        //     i += 4;
        // value.setCurrentIndex(i);
        // console.log(props.products.length);
    }
    const previousHandler = () => {
        // let i = currentIndex;
        // if(i >= 4)
        //     i -= 4;
        // value.setCurrentIndex(i);
        // console.log(i);
    }
    // style={{height: height}}
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
                    list.map((product) => (
                        <ProductItem
                            key={product.id}
                            id={product.id}
                            titleId={product.titleId}
                            titleEn={product.titleEn}
                            titleAr={product.titleAr}
                            image={product.image}
                            descriptionEn={product.descriptionEn}
                            descriptionAr={product.descriptionAr}
                            price={product.price}
                            path={props.path}
                            rate={product.rate}
                            ingredients={product.ingredients}/>
                    ))
                }
            </ul>
            {/* <hr style={{ backgroundColor: '#989898'}}/> */}
            {/* <Pagination nextHandler={nextHandler} previousHandler={previousHandler}/> */}
        </div>
    )
}

export default ProductList;