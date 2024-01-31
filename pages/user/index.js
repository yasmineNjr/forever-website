import AppContext from "@/AppContext";
import LogInComponent from "@/components/other/LogInComponent";
import { Fragment, useContext, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

function UserPage() {
    const router = useRouter()
    const value = useContext(AppContext);
    const { translateObj } = value.state;
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    value.setActivePath('/user');

    async function loginUserHandler(enteredUserData){
        //validation
        setLoading(true);
        const userData = {
            userName: enteredUserData.userName,
            password: enteredUserData.password,
        };
        setTimeout(() => {setLoading(false);},10000) ;
        const response = await fetch('/api/log-in', {
            method: 'POST',
            body: JSON.stringify(userData),
            header: {
                'Content/Type': 'application/json'
            }
        });
        const data = await response.json();
        // console.log(data.message);
        const msg = data.message;
        if(msg === 'notExist'){
            setStatus('notExist');
        }else if(msg === 'notValid'){
            setStatus('notValid');
        }else if(msg === 'valid'){
            setStatus('valid');
            setTimeout(() => {
                value.setCurrentUser(userData.userName) ;
                localStorage.setItem('currentUser', userData.userName);
                router.push('/');
            },3000) ;
        }
    }

    return (
        <Fragment>
             <Head>
                <title>{translateObj.login}</title>
                <meta name='description' content={translateObj.loginDescription}/>
            </Head>
            <LogInComponent onLogInUser={loginUserHandler} status={status} setStatus={setStatus} loading={loading}/>
        </Fragment>
    )
}

export default UserPage;