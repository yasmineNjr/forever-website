import { useContext } from "react";
import AppContext from "@/AppContext";

function SettingsPage(props) {

    const value = useContext(AppContext);
    let { allUsers } = value.state;

     //set active path
     value.setActivePath('/orders/settings');
  
    return  (
        <div>
            settings
        </div>
    )
        
}

export default SettingsPage;