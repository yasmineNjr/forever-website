import AppContext from "@/AppContext";
import SignupComponent from "@/components/other/SignupComponent";
import { Fragment, useContext, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function CreateUserPage() {
    const router = useRouter();
    const value = useContext(AppContext);
    const { translateObj } = value.state;
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    
    value.setActivePath('/createuser');

    async function addUserHandler(enteredUserData){
        //validation
        if(enteredUserData.password.length < 8){
            // console.log('use at least 8 characters!');
            setStatus('weak');
        }else if(enteredUserData.password.trim() !== enteredUserData.confirmedPassword.trim()){
            // console.log('check confirmed password!');
            setStatus('confirm');
        }else{//add
            setLoading(true);
            const userData = {
                firstName: enteredUserData.firstName,
                lastName: enteredUserData.lastName,
                userName: enteredUserData.userName,
                password: enteredUserData.password,
                date: enteredUserData.date,
            };
            setTimeout(() => {setLoading(false);},10000) ;
            const response = await fetch('/api/new-user', {
                method: 'POST',
                body: JSON.stringify(userData),
                header: {
                    'Content/Type': 'application/json'
                }
            });
            const data = await response.json();
            // console.log(data.message);
            const msg = data.message;
            if(msg === 'exist'){
                setStatus('exist');
            }else if(msg === 'notValid'){
                setStatus('notValid');
            }else if(msg === 'inserted'){
                setStatus('inserted');
                setTimeout(() => {
                    value.setCurrentUser(userData.userName) ;
                    localStorage.setItem('currentUser', userData.userName);
                    value.setCartItemsCount(0);
                    value.setOrdersCount(0);
                    value.setUserCart({});
                    router.push('/');
                },5000) ;
            }
        }
    }

    return (
        <Fragment>
             <Head>
                <title>{translateObj.createAccount}</title>
                <meta name='description' content={translateObj.createuserDescription}/>
            </Head>
            <SignupComponent onAddUser={addUserHandler} status={status} setStatus={setStatus} loading={loading}/>
        </Fragment>
    )
}

export default CreateUserPage;