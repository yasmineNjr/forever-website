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
    let { department, searchWord, translateObj, language, currentUser, cartItemsCount } = value.state;
    
    let cart = props.carts.find(c => {return c.userId === currentUser});
    let orders = [];
    props.orders.map(c => {if(c.userId === currentUser) orders.push(c)});
    
    // value.setCurrentIndex(0);
    value.setActivePath('/');
    let sum = 0;
    if(cart){
        cart.products.map(product => sum += Number(product.quantity));
        value.setCartItemsCount(sum);
    }
    if(orders){
        value.setOrdersCount(orders.length);
    }
    if(props.products){
        value.setAllProducts(props.products);
    }

    let products = [];
    if( department !== translateObj.all){
        if(language === 'en')
            props.products.map(product => { if(product.departmentEn.toLowerCase() === department.toLowerCase()) products.push(product) });
        else
            props.products.map(product => { if(product.departmentAr.toLowerCase() === department.toLowerCase()) products.push(product) });
    }else{
        products = props.products;
    }
    if(products.length > 0){
        if(language === 'en'){
            products = products.filter(product => product.titleEn.toLowerCase().includes(searchWord.toLowerCase()));
        }else{
            products = products.filter(product => product.titleAr.toLowerCase().includes(searchWord.toLowerCase()));
        }
    }  
    //products = products.sort(() => Math.random() - Math.random()).slice(0, 3);
    useEffect(() => {
       
        //setLoadedProducts(DUMMY_PRODUCTS);
        
        setLoadedProducts(products.sort(() => Math.random() - Math.random()).slice(0, 8));

        // setLoadedProducts(products);

    }, [department, searchWord]);

    return (
        <Fragment>
            <Head>
                <title>Forever</title>
                <meta name='description' content='Forever Company Website.'/>
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
   const cartCollection = db.collection('carts');
   let selectedCart;
   if(cartCollection){
       selectedCart = await cartCollection.find().toArray();
   }
   const ordersCollection = db.collection('orders');
   let selectedOrders;
   if(ordersCollection){
    //selectedOrders = await ordersCollection.find({userId: currentUser}).toArray();
    selectedOrders = await ordersCollection.find().toArray();;
   }
   const departmentsCollection = db.collection('departments');
   let departments;
   if(departmentsCollection){
    departments = await departmentsCollection.find().toArray();;
   }
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
            date: order.date,
            status: order.status,
            products: order.products,
            customer: order.customer,
            address: order.address,
            phone: order.phone,
        })) ,
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