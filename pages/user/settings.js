import { useContext } from "react";
import AppContext from "@/AppContext";
import DashboardSubList from "@/components/dashboard/DashboardSubList";

function SettingsPage(props) {

    const value = useContext(AppContext);
    let { allUsers } = value.state;

     //set active path
     value.setActivePath('/orders/settings');
 
      let list = allUsers;
        
    return  (
        <div>
            <DashboardSubList list={list} source='user'/>
        </div>
    )
        
}

export default SettingsPage;