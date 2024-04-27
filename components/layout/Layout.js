import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import Logo from './Logo';
import Logo1 from './Logo1';
import Search from './Search';
import Footer from './Footer';
import AppContext from "@/AppContext";
import { Fragment, useContext, useState } from "react";
import Router from "next/router";
import { Audio, Circles, Grid, Rings, Puff, ThreeDots, TailSpin, Oval } from 'react-loader-spinner';

function Layout(props) {
  
  const value = useContext(AppContext);
  const { allProducts, allDepartments, translateObj, activePath} = value.state;
  let path ;
  switch(activePath){
    case '/':                   path = translateObj.home; break;
    case '/products':           path = translateObj.products; break;
    case '/products/settings':  path = translateObj.dashboard+'/'+translateObj.products; break;
    case '/groups':             path = translateObj.groups; break;
    case '/groups/settings':    path = translateObj.dashboard+'/'+translateObj.groups; break;
    case '/cart':               path = translateObj.cart; break;
    case '/orders':             path = translateObj.orders; break;
    case '/orders/settings':    path = translateObj.dashboard+'/'+translateObj.orders; break;
    case '/orders/form':        path = translateObj.orderForm; break;
    case '/about':              path = translateObj.about; break;
    case '/user':               path = translateObj.login; break;
    case '/user/settings':      path = translateObj.dashboard+'/'+translateObj.marketers; break;
    case '/dashboard':          path = translateObj.dashboard; break;
    case '/createuser':         path = translateObj.createAccount; break;
    default:                    path = ''; break;
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
      <header className={classes.headercontainer}>
        <MainNavigation />
        {/* <Logo departments={props.departments}/> */}
        <Logo1 departments={allDepartments}/>
        <Search/>
      </header>
      { path !== '' && !loading &&
          <div className={classes.title} style={{marginTop: '13rem'}}>
            {path}
          </div>
      }
      {
        loading 
        ? 
        // <div className={classes.spinnerwrapper}>
        //     <div className={classes.spinner}></div>
        // </div>
        <div className={classes.spinnercontainer}>
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