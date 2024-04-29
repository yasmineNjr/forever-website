import { useContext } from "react";
import AppContext from "@/AppContext";
import DashboardSubList from "@/components/dashboard/DashboardSubList";

function SettingsPage() {

    const value = useContext(AppContext);
    let { allProducts } = value.state;

     //set active path
     value.setActivePath('/products/settings');

     let list = [];
    allProducts.map(product => {if(product.ingredients.length === 0) list.push(product)});
  
    return  (
        <div>
            <DashboardSubList list={list} source='order'/>
        </div>
    )
        
}

export default SettingsPage;