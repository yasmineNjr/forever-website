import { useRef, useState } from "react";
import Link from 'next/link';
import classes from './Logo.module.css';
import DUMMY_DEPARTMENTS from "@/data/departments";
import { useContext } from "react";
import AppContext from "@/AppContext";

function Logo(props)  {
    //console.log(props.departments);
    const value = useContext(AppContext);
    const { department, translateObj, language, activePath } = value.state;
    let margin ;
    language === 'ar' ?  margin= '1rem' : margin= '1rem';
    const [selectedOption, setSelectedOption] = useState(department);
    // const activePath = '/products';
    return (
        <header className={classes.header}>
          <div className={classes.logo}>
            <img style={{}} src='/images/Forever-Living-Products-logo.jpg' alt='logo' />
          </div>
          <nav>
            <ul>
                {/* <li>
                    <Link href='products/new-product'>{translateObj.dashboard}</Link>
                </li> */}
                <li style={ activePath === '/' ? {borderBottom: '1px solid #989898', fontWeight: 'bold', color: 'red' } : {borderBottom: '0px solid #989898'}}>
                    <Link href='/'>{translateObj.home}</Link>
                </li>
                <li>
                    {/* <Link href='/departments'>Departments</Link> */}
                    {/* <div className={classes.test}> */}
                        {/* <select className={classes.input} id='department' ref={departmentInputRef} onChange={console.log('xxx')}>
                                    <option value='0'>All</option>
                                    {DUMMY_DEPARTMENTS && 
                                        DUMMY_DEPARTMENTS.map(department => {
                                            return <option value={department.id}>{department.title}</option>
                                        })
                                    }
                        </select> */}
                        <select className={classes.input}
                            value={selectedOption}
                            onChange={e => {setSelectedOption(e.target.value); value.setDepartment(e.target.value);}}>
                            <option key='All' value={translateObj.all}>{translateObj.all}</option>
                            {props.departments
                                &&
                                props.departments.map(dep => (
                                    language === 'en' 
                                    ?
                                    <option key={dep.titleId} value={dep.titleEn}>{dep.titleEn}</option>
                                    :
                                    <option key={dep.titleId} value={dep.titleAr}>{dep.titleAr}</option>
                                ))
                            }
                        </select>
                    {/* </div> */}
                </li>
                <li style={ activePath === '/products' ? {borderBottom: '1px solid #989898', fontWeight: 'bold', color: 'red' } : {borderBottom: '0px solid #989898'}}>
                    <Link href='/products'>{translateObj.products}</Link>
                </li>
                <li style={ activePath === '/groups' ? {marginLeft: margin, borderBottom: '1px solid #989898', fontWeight: 'bold', color: 'red' } : {borderBottom: '0px solid #989898'}}>
                    <Link href='/groups'>{translateObj.groups}</Link>
                </li>
                <li  style={activePath === '/about' ? { marginLeft: margin, borderBottom: '1px solid #989898', fontWeight: 'bold', color: 'red' } : {marginLeft: margin, borderBottom: '0px solid #989898'}}>
                    <Link href='/about'>{translateObj.about}</Link>
                </li>
            </ul>
          </nav>
        </header>
      );
}

export default Logo;