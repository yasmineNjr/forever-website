import ProductFooterItem from './ProductFooterItem';
import classes from './ProductFooterList.module.css';

function ProductFooterList(props) {

    return(
        <ul className={classes.list}>
            {props.products.map((product) => (
                <ProductFooterItem
                    key={product.id}
                    id={product.id}
                    titleEn={product.titleEn}
                    titleAr={product.titleAr}
                    image={product.image}                        
                    description={product.description}
                    price={product.price}
                    rate={product.rate}
                    ingredients={product.ingredients}/>
            ))}
        </ul>
        
    )
}

export default ProductFooterList;