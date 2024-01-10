import Head from "next/head";
import { Fragment } from "react";
import AboutComponent from "@/components/other/AboutComponent";
import { useContext } from "react";
import AppContext from "@/AppContext";

function AboutPage() {

    const value = useContext(AppContext);
    let { translateObj } = value.state;
    value.setActivePath('/about');

    return (
        <Fragment>
            <Head>
                <title>{translateObj.aboutForever}</title>
                <meta name='description' content='About Forever company.'/>
            </Head>
           <AboutComponent/>
        </Fragment>
    );
    
}

export default AboutPage;