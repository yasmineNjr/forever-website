import { useContext } from "react";
import AppContext from "@/AppContext";

function SettingsPage(props) {

    const value = useContext(AppContext);

     //set active path
     value.setActivePath('/user/settings');
  
    return  (
        <div>
            settings
        </div>
    )
        
}

export default SettingsPage;