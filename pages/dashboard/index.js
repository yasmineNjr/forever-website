import { Fragment } from "react";
import Head from "next/head";
import { useContext } from "react";
import AppContext from "@/AppContext";
import DashboardComponent from "@/components/dashboard/DashboardComponent";

function DashboardPage(props) {

    const value = useContext(AppContext);
    let { translateObj , language } = value.state;
    
    //set active path
    value.setActivePath('/dashboard');

    return  (
        <Fragment>
             <Head>
                <title>{translateObj.dashboard}</title>
                <meta name='description' content={translateObj.dashboardDescription}/>
            </Head>
            <DashboardComponent/>
        </Fragment>
    )
    
}

export default DashboardPage;