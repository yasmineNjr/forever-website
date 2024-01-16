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
  //console.log(props);
  const value = useContext(AppContext);
  const { allProducts } = value.state;
  //console.log(allProducts);

  const [loading, setLoading] = useState(false);
  Router.events.on('routeChangeStart', (url) => {
    console.log('Route is changing');
    setLoading(true);
  });
  Router.events.on('routeChangeComplete', (url) => {
    console.log('Route is completed');
    setLoading(false);
  });

  return (
    
    <div className={classes.container}>
      <MainNavigation />
      {/* <Logo departments={props.departments}/> */}
      <Logo1 departments={props.departments}/>
      <Search/>
      {
        loading 
        ? 
        // <div className={classes.spinnerwrapper}>
        //     <div className={classes.spinner}></div>
            
        // </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh'}}>
          <ThreeDots
                  height="80"
                  width="80"
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