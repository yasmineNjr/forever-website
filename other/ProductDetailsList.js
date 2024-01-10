import ProductDetailsItem from './ProductDetailsItem';
import classes from './ProductDetailsList.module.css';

function ProductDetailsList(props) {

    return(
        <ul className={classes.list}>
            {props.products.map((product) => (
                <ProductDetailsItem
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    image={product.image}
                    price={product.price}/>
            ))}
        </ul>
        
    )
}

export default ProductDetailsList;