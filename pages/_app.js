import "bootstrap/dist/css/bootstrap.min.css";
import Layout from '@/components/layout/Layout';
import '../styles/globals.css';
import { useState } from "react";
import AppContext from "@/AppContext";
import languageObjectEn from '../translate/en';

function MyApp({ Component, pageProps }) {

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
  const [currentUser, setCurrentUser] = useState('u1');
  //console.log(pageProps.departments); 

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
      }}
    >
        <Layout products={pageProps.products} departments={pageProps.departments}>
          <Component {...pageProps} />
        </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;