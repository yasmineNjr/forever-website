import { useState } from "react";
import classes from './Logo1.module.css';
import {MdLanguage} from 'react-icons/md'
import { useContext } from "react";
import AppContext from "@/AppContext";
import { NavDropdown } from "react-bootstrap";
import languageObjectEn from '../../translate/en';
import languageObjectAr from '../../translate/ar';
import { IoLanguage } from "react-icons/io5";
import { Sa, Qa, Kw, Bh, Om, Ae } from "react-flags-select";

function Logo1(props) {

    const value = useContext(AppContext);
    let { language, translateObj, screenSize } = value.state;
    
    const [selectedOption, setSelectedOption] = useState('');
    const [selected, setSelected] = useState("SA");
    const [curText, setCurText] = useState(translateObj.saudiCur);
    const [flag, setFlag] = useState(<Sa/>);
    
    const selectedHandler = (code) => {
        let cur, curTxt ;
        if(code === 'SA'){
            cur = {'code': 'SA', 'curEn': 'SR', 'curAr': 'ر.س'} ;
            curTxt = translateObj.saudiCur;
            setFlag(<Sa/>);
        }else if(code === 'QA'){
            cur = {'code': 'QA', 'curEn': 'QR', 'curAr': 'ر.ق'};
            curTxt = translateObj.qatarCur;
            setFlag(<Qa selectedSize={14}/>);
        }else if(code === 'BH'){
            cur = {'code': 'BH', 'curEn': 'BD', 'curAr': 'د.ب'};
            curTxt = translateObj.bahrainCur;
            setFlag(<Bh/>);
        }else if(code === 'AE'){
            cur = {'code': 'AE', 'curEn': 'AED', 'curAr': 'د.إ'};
            curTxt = translateObj.emiratesCur;
            setFlag(<Ae/>);
        }else if(code === 'KW'){
            cur = {'code': 'KW', 'curEn': 'KD', 'curAr': 'د.ك'};
            curTxt = translateObj.kuwaitCur;
            setFlag(<Kw/>);
        }else if(code === 'OM'){
            cur = {'code': 'OM', 'curEn': 'OR', 'curAr': 'ر.ع'};
            curTxt = translateObj.omanCur;
            setFlag(<Om/>);
        }
        value.setCurrency(cur);
        setCurText(curTxt);
    }

    return (
        <header className={classes.header}>
            <div className={classes.control}>
                <select className={classes.input}
                        value={selectedOption}
                        onChange={e => {setSelectedOption(e.target.value); value.setDepartment(e.target.value);}}>
                        <option key='All' value={translateObj.all} style={screenSize > 500 ? { fontSize: '0.85rem'} : { fontSize: '0.5rem' }}>{translateObj.all}</option>
                            {props.departments
                                &&
                                props.departments.map(dep => (
                                    language === 'en' 
                                    ?
                                    <option key={dep.titleId} value={dep.titleEn} style={screenSize > 500 ? { fontSize: '0.85rem'} : { fontSize: '0.5rem' }}>{dep.titleEn}</option>
                                    :
                                    <option key={dep.titleId} value={dep.titleAr} style={screenSize > 500 ? { fontSize: '0.85rem'} : { fontSize: '0.5rem' }}>{dep.titleAr}</option>
                                ))
                            }
                </select>
            </div>
            <nav>
                <ul style={language === 'en' ? {justifyContent: 'left'} : {justifyContent: 'right'}}>
                    <li>
                        <div style={screenSize > 500 ? { fontSize: '1rem'} : { fontSize: '0.85rem' }}>{curText}</div>
                    </li>
                   <li>
                        <NavDropdown //title={<MdLanguage color='#657415' size={screenSize > 500 ? '1.2rem' : '1rem'}/>}
                                     title={flag}
                                     id="dropdown-menu-align-end" >
                            <NavDropdown.Item style={screenSize > 500 ? { fontSize: '14px'} : { fontSize: '12px' }} eventKey="1"
                                            onClick={() => {setSelected('SA'); selectedHandler('SA');}}>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Sa /> 
                                    <div style={{paddingRight: '10px', paddingLeft: '10px'}}>{translateObj.saudi}</div>
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item style={screenSize > 500 ? { fontSize: '14px'} : { fontSize: '12px' }} eventKey="2"
                                            onClick={() => {setSelected('QA'); selectedHandler('QA');}}>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Qa /> 
                                    <div style={{paddingRight: '10px', paddingLeft: '10px'}}>{translateObj.qatar}</div> 
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item style={screenSize > 500 ? { fontSize: '14px'} : { fontSize: '12px' }} eventKey="2"
                                            onClick={() => {setSelected('BH'); selectedHandler('BH');}}>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Bh /> 
                                    <div style={{paddingRight: '10px', paddingLeft: '10px'}}>{translateObj.bahrain}</div>
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item style={screenSize > 500 ? { fontSize: '14px'} : { fontSize: '12px' }} eventKey="2"
                                            onClick={() => {setSelected('AE'); selectedHandler('AE');}}>
                                 <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Ae /> 
                                    <div style={{paddingRight: '10px', paddingLeft: '10px'}}>{translateObj.emirates}</div>
                                 </div>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item style={screenSize > 500 ? { fontSize: '14px'} : { fontSize: '12px' }} eventKey="2"
                                            onClick={() => {setSelected('OM'); selectedHandler('OM');}}>
                                <div style={{display: 'flex', flexDirection: 'OM', alignItems: 'center'}}>
                                    <Om /> 
                                    <div style={{paddingRight: '10px', paddingLeft: '10px'}}>{translateObj.oman}</div>
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item style={screenSize > 500 ? { fontSize: '14px'} : { fontSize: '12px' }} eventKey="2"
                                            onClick={() => {setSelected('KW'); selectedHandler('KW');}}>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Kw /> 
                                    <div style={{paddingRight: '10px', paddingLeft: '10px'}}>{translateObj.kuwait}</div>
                                </div>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </li>
                   
                    <li>
                        <NavDropdown
                            title={<IoLanguage color='#657415' size={screenSize > 500 ? '1.2rem' : '1rem'} />}
                            id="dropdown-menu-align-end"
                            >
                            <NavDropdown.Item style={screenSize > 500 ? { fontSize: '14px'} : { fontSize: '12px' }} eventKey="1"
                                            onClick={() => {document.body.dir = 'ltr'; value.setLanguage('en'); value.setTranslateObj(languageObjectEn);}}>
                                English
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item style={screenSize > 500 ? { fontSize: '14px'} : { fontSize: '12px' }} eventKey="2"
                                            onClick={() => {document.body.dir = 'rtl'; value.setLanguage('ar'); value.setTranslateObj(languageObjectAr);}}>
                                العربية
                            </NavDropdown.Item>
                        </NavDropdown>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Logo1;


