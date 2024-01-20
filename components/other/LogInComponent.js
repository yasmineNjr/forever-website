import classes from './LogInComponent.module.css';
import { useContext, useState } from "react";
import AppContext from "@/AppContext";
import Card from '../ui/Card';
import Link from 'next/link';
import { TailSpin } from 'react-loader-spinner';
import { IoCloseCircle } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

function LogInComponent(props) {
    
    const value = useContext(AppContext);
    let { translateObj, screenSize, language } = value.state;
    value.setActivePath('/user');

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState('false');

    const loginHandler = (event) => {
        event.preventDefault();
        const userData = {
            userName: userName,
            password: password,
        };
        props.onLogInUser(userData);
    }
    function showPasswordHandler(){
        setShowPassword(!showPassword);
    }
    return (
        <div className={classes.main}>
            <div className={classes.submain}>
                <Card>
                    <form onSubmit={loginHandler} className={classes.form}>
                        <div className={classes.control} style={{marginTop: '1rem'}}>
                            <input type='text'
                                    required
                                   className={classes.input}
                                   value={userName}
                                   placeholder={translateObj.userNameHint}
                                    onChange={e => {setUserName(e.target.value); props.setStatus('');}}
                                />
                        </div>
                        {
                            props.status === 'notExist'
                            ?
                            <div className={classes.errorcontainer}>
                                <IoCloseCircle color='red' size='1rem' style={language === 'en' ? {marginRight: '0.25rem'} : {marginLeft: '0.25rem'}}/>
                                {translateObj.notValidUserNameMsg}
                            </div>
                            :
                            <div className={classes.errorcontainer}>
                                 {
                                    props.loading &&
                                        <TailSpin
                                            height="12"
                                            width="12"
                                            radius="5"
                                            color="green"
                                            ariaLabel="loading"
                                        />
                                }
                            </div>
                        }
                        <div className={classes.control}>
                            <input  type={!showPassword ? 'text' : 'password'} 
                                    required
                                    className={classes.input}
                                    value={password}
                                    placeholder={translateObj.passordHint}
                                    onChange={e => {setPassword(e.target.value); props.setStatus('');}}
                                />
                             {
                                !showPassword 
                                ?
                                <IoEye color='#657415' size={screenSize > 500 ? '1.25rem' : '1rem'} style={language === 'en' ? {marginRight: '0.25rem'} : {marginLeft: '0.25rem'}} onClick={showPasswordHandler}/>
                                :
                                <IoMdEyeOff color='#989898' size={screenSize > 500 ? '1.25rem' : '1rem'} style={language === 'en' ? {marginRight: '0.25rem'} : {marginLeft: '0.25rem'}} onClick={showPasswordHandler}/>
                            }
                        </div>
                        {
                            props.status === 'notValid'
                            ?
                            <div className={classes.errorcontainer}>
                                <IoCloseCircle color='red' size='1rem' style={language === 'en' ? {marginRight: '0.25rem'} : {marginLeft: '0.25rem'}}/>
                                {translateObj.wrongPasswordMsg}
                            </div>
                            :
                            <div className={classes.errorcontainer}>
                                {
                                    props.loading &&
                                        <TailSpin
                                            height="12"
                                            width="12"
                                            radius="5"
                                            color="green"
                                            ariaLabel="loading"
                                        />
                                }
                            </div>
                        }
                        {
                            props.status === 'valid' 
                            ?
                            <div className={classes.errorcontainer} style={{color: '#657415', justifyContent: 'center'}}>
                                {translateObj.loggedInMsg}{userName}!
                            </div>
                            :
                            <div className={classes.errorcontainer}>
                            </div>
                        }
                        <button className={classes.button} >{translateObj.login}</button>
                        <Link href='/createuser' style={{marginBottom: '1rem', color: '#657415'}}>{translateObj.createAccount}</Link>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default LogInComponent;