import classes from './SignupComponent.module.css';
import { useContext, useState } from "react";
import AppContext from "@/AppContext";
import Card from '../ui/Card';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { TailSpin } from 'react-loader-spinner';

function SignupComponent(props) {
    
    const value = useContext(AppContext);
    let { translateObj, screenSize, language } = value.state;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [showPassword, setShowPassword] = useState('false');
    const [showConfirmedPassword, setShowConfirmedPassword] = useState('false');

    function signupHandler(event) {
        event.preventDefault();
       
        const userData = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: password,
            confirmedPassword: confirmedPassword,
            date: new Date(),
        };
        
        props.onAddUser(userData);
    }
    function showPasswordHandler(){
        setShowPassword(!showPassword);
    }
    function showConfirmedPasswordHandler(){
        setShowConfirmedPassword(!showConfirmedPassword);
    }
   
    return (
        <div className={classes.main}>
            <div className={classes.submain}>
                <Card>
                    <form className={classes.form}
                            onSubmit={signupHandler}>
                        <div className={classes.control} style={{marginTop: '1rem'}}>
                            <input type='text' required
                                   className={classes.input} 
                                   value={firstName}
                                   placeholder={translateObj.firstNameHint}
                                    onChange={e => {setFirstName(e.target.value); props.setStatus('');}}
                                />
                        </div>
                        {
                            props.status === 'exist'
                            ?
                            <div className={classes.errorcontainer}>
                                <IoCloseCircle color='red' size='1rem' style={language === 'en' ? {marginRight: '0.25rem'} : {marginLeft: '0.25rem'}}/>
                                {translateObj.existUserMsg}
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
                            <input type='text' required
                                   className={classes.input}
                                   value={lastName}
                                   placeholder={translateObj.lastNameHint}
                                    onChange={e => {setLastName(e.target.value); props.setStatus('');}}
                                />
                        </div>
                        {
                            props.status === 'exist'
                            ?
                            <div className={classes.errorcontainer}>
                                <IoCloseCircle color='red' size='1rem' style={language === 'en' ? {marginRight: '0.25rem'} : {marginLeft: '0.25rem'}}/>
                                {translateObj.existUserMsg}
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
                            <input type='text' required
                                   className={classes.input}
                                   value={userName}
                                   placeholder={translateObj.userNameHint}
                                    onChange={e => {setUserName(e.target.value); props.setStatus('');}}
                                />
                        </div>
                        {
                            props.status === 'notValid'
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
                        <div className={classes.control} style={{display: 'flex', flexDirection: 'row'}}>
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
                            props.status === 'weak'
                            ?
                            <div className={classes.errorcontainer}>
                                <IoCloseCircle color='red' size='1rem' style={language === 'en' ? {marginRight: '0.25rem'} : {marginLeft: '0.25rem'}}/>
                                {translateObj.checkPasswordMsg}
                            </div>
                            :
                            <div className={classes.errorcontainer}>
                            </div>
                        }
                        <div className={classes.control} style={{display: 'flex', flexDirection: 'row'}}>
                            <input  type={!showConfirmedPassword ? 'text' : 'password'} 
                                    required
                                    className={classes.input}
                                    value={confirmedPassword}
                                    placeholder={translateObj.confirmPassordHint}
                                    onChange={e => {setConfirmedPassword(e.target.value); props.setStatus('');}}
                                />
                            {
                                !showConfirmedPassword 
                                ?
                                <IoEye color='#657415' size={screenSize > 500 ? '1.25rem' : '1rem'} style={language === 'en' ? {marginRight: '0.25rem'} : {marginLeft: '0.25rem'}} onClick={showConfirmedPasswordHandler}/>
                                :
                                <IoMdEyeOff color='#989898' size={screenSize > 500 ? '1.25rem' : '1rem'} style={language === 'en' ? {marginRight: '0.25rem'} : {marginLeft: '0.25rem'}} onClick={showConfirmedPasswordHandler}/>
                            }
                        </div>
                        {
                            props.status === 'confirm'
                            ?
                            <div className={classes.errorcontainer}>
                                <IoCloseCircle color='red' size='1rem' style={language === 'en' ? {marginRight: '0.25rem'} : {marginLeft: '0.25rem'}}/>
                                {translateObj.checkConfirmedPasswordMsg}
                            </div>
                            :
                            <div className={classes.errorcontainer}>
                            </div>
                        }
                        {
                            props.status === 'inserted' 
                            ?
                            <div className={classes.errorcontainer} style={{color: '#657415', justifyContent: 'center'}}>
                                {translateObj.loggedInMsg}{userName}!
                            </div>
                            :
                            <div className={classes.errorcontainer}>
                            </div>
                        }
                        <button className={classes.button}>{translateObj.createAccount}</button>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default SignupComponent;