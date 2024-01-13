import { MongoClient} from "mongodb";
import SETTINGS from "@/data/settings";
import Head from "next/head";
import { useState, useEffect, Fragment } from "react";
import ProductList from "@/components/products/ProductList";
// import DUMMY_PRODUCTS from "@/data/products";
import { useContext } from "react";
import AppContext from "@/AppContext";

function HomePage(props) {
    //console.log(props);
    const [loadedProducts, setLoadedProducts] = useState([]);
    const value = useContext(AppContext);
    
    // value.setCurrentIndex(0);
    value.setActivePath('/');
    let sum = 0;
    if(props.cart){
        props.cart.products.map(product => sum += Number(product.quantity));
        value.setCartItemsCount(sum);
    }
    if(props.orders){
        value.setOrdersCount(props.orders.length);
    }
    if(props.products){
        value.setAllProducts(props.products);
    }
    let { department } = value.state;
    let { searchWord } = value.state;
    const { translateObj, language } = value.state;

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
       selectedCart = await cartCollection.findOne({userId: SETTINGS.currentUser});
   }
   const ordersCollection = db.collection('orders');
   let selectedOrders;
   if(ordersCollection){
    selectedOrders = await ordersCollection.find({userId: SETTINGS.currentUser}).toArray();;
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
        })) ,
          cart: selectedCart ? 
            {
                id: selectedCart._id.toString(),
                userId: selectedCart.userId,
                products: selectedCart.products,
            }
            :
            {
                id: '',
                userId: SETTINGS.currentUser,
                products: [],
            }
      },
       revalidate: 10
   }
}
export default HomePage;