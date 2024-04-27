import { useContext } from "react";
import AppContext from "@/AppContext";
import DashboardSubList from "@/components/dashboard/DashboardSubList";

function SettingsPage(props) {

    const value = useContext(AppContext);

     //set active path
     value.setActivePath('/products/settings');
  
    return  (
        <div>
            <DashboardSubList />
        </div>
    )
        
}

export default SettingsPage;