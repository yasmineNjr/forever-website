import Link from 'next/link';

import classes from './MainNavigation.module.css';
import { FaFacebook, FaInstagram, FaPinterest, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { useContext } from "react";
import AppContext from "@/AppContext";
import { GiEagleEmblem } from "react-icons/gi";

function MainNavigation() {
  
  const value = useContext(AppContext);
  let { language, translateObj, screenSize } = value.state;
  
  return (
    <header className={classes.header}>
      
      <div className={classes.logo}>
        <GiEagleEmblem color='white' size='1.35rem' style={language === 'en' ? {paddingRight: '0.25rem', paddingBottom: '0.25rem'} : {paddingLeft: '0.25rem', paddingBottom: '0.25rem'}}/>
        {translateObj.welcome}
      </div>
      <nav>
        <ul>
          <li>
            {/* <a href='https://www.facebook.com/FOREVER/' target='_blank' rel='noreferrer'> */}
              <FaFacebook color='white' size={screenSize > 430 ? '1.2rem' : '1rem'}/>
            {/* </a> */}
          </li>
          <li>
            {/* <a href='https://www.instagram.com/foreverglobalhq/' target='_blank' rel='noreferrer'> */}
              <FaInstagram color='white' size={screenSize > 430 ? '1.2rem' : '1rem'}/>
            {/* </a> */}
          </li>
          <li>
            {/* <a href='https://www.pinterest.com/ForeverGlobalHQ/' target='_blank' rel='noreferrer'> */}
              <FaPinterest color='white' size={screenSize > 430 ? '1.2rem' : '1rem'} />
            {/* </a> */}
          </li>
          <li>
            {/* <a href='https://telegram.me/s/FeelbetterForever?before=59' target='_blank' rel='noreferrer'> */}
              <FaTelegram color='white' size={screenSize > 430 ? '1.2rem' : '1rem'} />
            {/* </a> */}
          </li>
          <li>
            {/* <a href='https://telegram.me/s/FeelbetterForever?before=59' target='_blank' rel='noreferrer'> */}
              <FaWhatsapp color='white' size={screenSize > 430 ? '1.2rem' : '1rem'} />
            {/* </a> */}
          </li>
          <li>
            <FiMail color='white' size={screenSize > 430 ? '1.2rem' : '1rem'}/>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
////966572887075
//arabforever2000@gmail.com