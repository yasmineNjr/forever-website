import classes from './AboutComponent.module.css';
import { useContext } from "react";
import AppContext from "@/AppContext";

function AboutComponent(props) {
    
    const value = useContext(AppContext);
    let { translateObj } = value.state;

    return (
        <div className={classes.div}>
            <h1>{translateObj.mainTitle}</h1>
            <h2>{translateObj.subTitle}</h2>
            <p>{translateObj.aboutParagraph1}</p>
            <p>{translateObj.aboutParagraph2}</p>
            <p>{translateObj.aboutParagraph3}</p>
        </div>
    )
}

export default AboutComponent;