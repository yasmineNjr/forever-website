import { MongoClient} from "mongodb";
import Head from "next/head";
import { useState, useEffect, Fragment } from "react";
import ProductList from "@/components/products/ProductList";
// import DUMMY_PRODUCTS from "@/data/products";
import { useContext } from "react";
import AppContext from "@/AppContext";

function HomePage(props) {
    
    const [loadedProducts, setLoadedProducts] = useState([]);
    const value = useContext(AppContext);
    let { department, searchWord, translateObj, language, currentUser, userOrders } = value.state;
    
    //get cart by currentUser
    value.setAllCarts(props.carts);
    let cart = props.carts.find(c => {return c.userId === currentUser});
    if(cart !== undefined)
        value.setUserCart(cart);
    
    //get orders by currentUser
    value.setAllOrders(props.orders);
    let orders = [];
    props.orders.map(c => {if(c.userId === currentUser) orders.push(c)});
    // value.setUserOrders(orders);///////////???????????????????
    
    //set active path
    value.setActivePath('/');
    //set cart items count
    let sum = 0;
    if(cart){
        cart.products.map(product => sum += Number(product.quantity));
        value.setCartItemsCount(sum);
    }
    
    //set orders count
    if(orders){
        value.setOrdersCount(orders.length);
    }
    
    //get all products
    if(props.products){
        value.setAllProducts(props.products);
    }

    //get all departments
    if(props.departments){
        value.setAllDepartments(props.departments);
    }
   
    //get products by department
    let products = [];
    if( department !== translateObj.all){
        if(language === 'en')
            props.products.map(product => { if(product.departmentEn.toLowerCase() === department.toLowerCase()) products.push(product) });
        else
            props.products.map(product => { if(product.departmentAr.toLowerCase() === department.toLowerCase()) products.push(product) });
    }else{
        products = props.products;
    }

    //get products by searchWord
    if(products.length > 0){
        if(language === 'en'){
            products = products.filter(product => product.titleEn.toLowerCase().includes(searchWord.toLowerCase()));
        }else{
            products = products.filter(product => product.titleAr.toLowerCase().includes(searchWord.toLowerCase()));
        }
    }  
    useEffect(() => {
       
        setLoadedProducts(products.sort(() => Math.random() - Math.random()).slice(0, 8));

    }, [department, searchWord]);

    return (
        <Fragment>
            <Head>
                <title>{translateObj.welcome}</title>
                <meta name='description' content={translateObj.mainTitle}/>
            </Head>
            <ProductList products={loadedProducts} path=''/>
        </Fragment>
    );
  
}
export async function getStaticProps(){
    
  //fetch data from API
  const client = await MongoClient.connect(
   'mongodb+srv://foreverUser:PwDV1m7yVI0D72uc@cluster0.ci8azls.mongodb.net/foreverDB?retryWrites=true&w=majority'
   );
   const db = client.db();
   //get cart
   const cartCollection = db.collection('carts');
   let selectedCart;
   if(cartCollection){
       selectedCart = await cartCollection.find().toArray();
   }
   //get orders
   const ordersCollection = db.collection('orders');
   let selectedOrders;
   if(ordersCollection){
    //selectedOrders = await ordersCollection.find({userId: currentUser}).toArray();
    selectedOrders = await ordersCollection.find().toArray();;
   }
   //get departments
   const departmentsCollection = db.collection('departments');
   let departments;
   if(departmentsCollection){
    departments = await departmentsCollection.find().toArray();;
   }
   //get products
   const productsCollection = db.collection('products');
   let products;
   if(productsCollection){
    products = await productsCollection.find().toArray();;
   }
   
   client.close();
   return {
       props: {
        products: products.map((product) => ({
            id: product._id.toString(),
            titleId: product.titleId,
            titleEn: product.title.en,
            titleAr: product.title.ar,
            image: product.image,
            descriptionEn: product.description.en,
            descriptionAr: product.description.ar,
            price: product.price,
            departmentEn: product.department.en,
            departmentAr: product.department.ar,
            groups: product.groups,
            ingredients: product.ingredients,
            date: product.date,
            rate: product.rate,
            salesCount: product.salesCount
        })),
        departments: departments.map((department) => ({
            id: department._id.toString(),
            titleId: department.titleId,
            titleEn: department.title.en,
            titleAr: department.title.ar,
        })) ,
        orders: selectedOrders.map((order) => ({
            id: order._id.toString(),
            userId: order.userId,
            currency: order.currency,
            date: order.date,
            status: order.status,
            products: order.products,
            customer: order.customer,
            address: order.address,
            phone: order.phone,
        })),
        carts: selectedCart.map((cart) => ({
            id: cart._id.toString(),
            userId: cart.userId,
            currency: cart.currency,
            products: cart.products,
        }))
      },
       revalidate: 10
   }
}
export default HomePage;