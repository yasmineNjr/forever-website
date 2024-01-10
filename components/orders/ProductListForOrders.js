import ProductItemForOrders from './ProductItemForOrders'
import classes from './ProductListForOrders.module.css';

function ProductListForOrders(props) {
   
    return(
            <ul className={classes.list}>
                {props.products.map((product) => (
                    <ProductItemForOrders
                        key={product.id}
                        titleEn={product.titleEn}
                        titleAr={product.titleAr}
                        quantity={product.quantity}/>
                ))}
                {/* <div>order</div> */}
            </ul>
    )
}

export default ProductListForOrders;