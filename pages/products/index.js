import { MongoClient } from "mongodb";
import ProductList from "@/components/products/ProductList";
import { Fragment } from "react";
import Head from "next/head";
import { useContext } from "react";
import AppContext from "@/AppContext";
//import DUMMY_PRODUCTS from "@/data/products";

function ProductsPage(props) {

    // const [loadedProducts, setLoadedProducts] = useState([]);
    // const [path, setPath] = useState('');
    // useEffect(() => {

    //     setLoadedProducts(DUMMY_PRODUCTS);
    //     setPath('/products/');

    // }, []);
    
    const value = useContext(AppContext);
    let { department, searchWord, translateObj , language} = value.state;
    
    // value.setCurrentIndex(0);
    value.setActivePath('/products');
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
    
    return  (
        <Fragment>
             <Head>
                <title>Forever Products</title>
                <meta name='description' content='Browse all available Forever products.'/>
            </Head>
            <ProductList products={products} path={props.path}/> 
        </Fragment>
    )
    
    //<ProductList products={loadedProducts} path={path}/>
    
}
//this is used to rerender every x second through the build process
//it is useful when we do not have data changing all the time and we do not need to access the request object
//like authentication
export async function getStaticProps(){
   //fetch data from API
   const client = await MongoClient.connect(
    'mongodb+srv://foreverUser:PwDV1m7yVI0D72uc@cluster0.ci8azls.mongodb.net/foreverDB?retryWrites=true&w=majority'
    );
    const db = client.db();
    const productsCollection = db.collection('products');
    const prods = await productsCollection.find().toArray();
    let products = []; 
    prods.map(product => {if(product.ingredients.length === 0) products.push(product)});
    //console.log(products);
    const departmentsCollection = db.collection('departments');
    let departments;
    if(departmentsCollection){
        departments = await departmentsCollection.find().toArray();;
    }
    client.close();
    return {
        props: {
            //products: DUMMY_PRODUCTS,
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
            path: '/products/'
        },
        //this is used to rerender the page every x seconds and it is useful if there are a lot of requests
        //=== the page is updated regularly after deployment
        revalidate: 10
    }
}
//alternative way to getStaticProps 
//it is used when we need to regenerate the page on each request on the fly after deployment
//the disadvantage is waiting to regenerate the page on every incomming request
// export async function getServerSideProps(context){
//     const req = context.req;
//     const res = context.res;
//     //fetch data from API
//     return {
//         props: {
//             products: DUMMY_PRODUCTS,
//             path: '/products/'
//         }
//     }
// }

export default ProductsPage;