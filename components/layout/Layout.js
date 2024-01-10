import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import Logo from './Logo';
import Logo1 from './Logo1';
import Search from './Search';
import Footer from './Footer';
import AppContext from "@/AppContext";
import { useContext } from "react";

function Layout(props) {
  //console.log(props);
  const value = useContext(AppContext);
  const { allProducts } = value.state;
  //console.log(allProducts);
  return (
    
    <div className={classes.container}>
      <MainNavigation />
      {/* <Logo departments={props.departments}/> */}
      <Logo1 departments={props.departments}/>
      <Search/>
      <main className={classes.main}>{props.children}</main>
      <Footer products={allProducts}/>
    </div>

  );
}

export default Layout;