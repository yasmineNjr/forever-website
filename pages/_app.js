import "bootstrap/dist/css/bootstrap.min.css";
import Layout from '@/components/layout/Layout';
import '../styles/globals.css';
import { useState, useEffect } from "react";
import AppContext from "@/AppContext";
import languageObjectEn from '../translate/en';
// import { useRouter } from "next/router";
// //import Router from "next/router";
// //import Loader from "@/components/Loader";

// function Loading(){
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     const handleStart = (url) => (url !== router.asPath) && setLoading(true);
//     const handleComplete = (url) => (url === router.asPath) && setTimeout(() => {setLoading(false);},2000) ;

//     router.events.on('routeChangeStart', handleStart);
//     router.events.on('routeChangeComplete', handleComplete);
//     router.events.on('routeChangeError', handleComplete);

//     return() => {
//       router.events.off('routeChangeStart', handleStart);
//       router.events.off('routeChangeComplete', handleComplete);
//       router.events.off('routeChangeError', handleComplete);
//     }
//   });
//   return loading && <div className="spinner-wrapper">
//     <div className="spinner">
//     </div>
//   </div>
// }
function MyApp({ Component, pageProps }) {
  
  function getCurrentDimension(){
    if (typeof window !== 'undefined')
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
  }
  let loginUser = '';
  if (typeof window !== 'undefined' && window.localStorage) {
    loginUser = localStorage.getItem('currentUser') || '';
  }
  
  console.log('loginUser', loginUser);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [language, setLanguage] = useState('en');
  const [translateObj, setTranslateObj] = useState(languageObjectEn);
  const [theme, setTheme] = useState('dark');
  const [department, setDepartment] = useState('All');
  const [searchWord, setSearchWord] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [currency, setCurrency] = useState({'code': 'SA', 'curEn': 'SR', 'curAr': 'ر.س'});
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [activePath, setActivePath] = useState('/');
  const [currentUser, setCurrentUser] = useState(loginUser);
  const [screenSize, setScreenSize] = useState(1113);

  //console.log(pageProps.departments); 

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension().width);
    }
    window.addEventListener('resize', updateDimension);
    
    return(() => {
        window.removeEventListener('resize', updateDimension);
    })
  }, [screenSize]);

  // const [loading, setLoading] = useState(false);
  // Router.events.on('routeChangeStart', (url) => {
  //   console.log('Route is changing');
  //   setLoading(true);
  // });
  // Router.events.on('routeChangeComplete', (url) => {
  //   console.log('Route is completed');
  //   setLoading(false);
  // });
  
  return (
    <AppContext.Provider
      value={{
        state: {
          cartItemsCount: cartItemsCount,
          ordersCount   : ordersCount,
          language      : language,
          translateObj  : translateObj,
          theme         : theme,
          department    : department,
          searchWord    : searchWord,
          allProducts   : allProducts,
          currency      : currency,
          // currentIndex  : currentIndex,
          activePath    : activePath,
          currentUser   : currentUser,
          screenSize    : screenSize
        },
        setCartItemsCount: setCartItemsCount,
        setOrdersCount   : setOrdersCount,
        setLanguage      : setLanguage,
        setTranslateObj  : setTranslateObj,
        setTheme         : setTheme,
        setDepartment    : setDepartment,
        setSearchWord    : setSearchWord,
        setAllProducts   : setAllProducts,
        setCurrency      : setCurrency,
        // setCurrentIndex  : setCurrentIndex,
        setActivePath    : setActivePath,
        setCurrentUser   : setCurrentUser,
        setScreenSize    : setScreenSize
      }}
    >
        <Layout products={pageProps.products} departments={pageProps.departments}>
          {/* <Loading/><Component {...pageProps} /> */}
          {/* {loading && <Loader/>} */}
          <Component {...pageProps} />
        </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;