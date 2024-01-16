import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import Logo from './Logo';
import Logo1 from './Logo1';
import Search from './Search';
import Footer from './Footer';
import AppContext from "@/AppContext";
import { useContext, useState } from "react";
import Router from "next/router";
import { Audio, Circles, Grid, Rings, Puff, ThreeDots, TailSpin, Oval } from 'react-loader-spinner'

function Layout(props) {
  
  const value = useContext(AppContext);
  const { allProducts, translateObj, activePath} = value.state;
  let path ;
  switch(activePath){
    case '/': path = translateObj.home; break;
    case '/products': path = translateObj.products; break;
    case '/groups': path = translateObj.groups; break;
    case '/cart': path = translateObj.cart; break;
    case '/orders': path = translateObj.orders; break;
    case '/about': path = translateObj.about; break;
    case '/user': path = translateObj.user; break;
    case '/dashboard': path = translateObj.dashboard; break;
    default: path = ''; break;
  }

  const [loading, setLoading] = useState(false);
  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
  });
  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
  });

  return (
    <div className={classes.container}>
      <MainNavigation />
      {/* <Logo departments={props.departments}/> */}
      <Logo1 departments={props.departments}/>
      <Search/>
      { path !== '' && !loading &&
        <div className={classes.title}>
          {path}
        </div>
      }
      {
        loading 
        ? 
        // <div className={classes.spinnerwrapper}>
        //     <div className={classes.spinner}></div>
            
        // </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh'}}>
          <ThreeDots
                  height="50"
                  width="50"
                  radius="9"
                  color="#657415"
                  ariaLabel="loading"
                  // wrapperStyle
                  // wrapperClass
                />
        </div>
        :
        <main className={classes.main}>{props.children}</main>
      }
      <Footer products={allProducts}/>
    </div>

  );
}

export default Layout;