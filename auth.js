import { useEffect, useState } from 'react';
import AuthForm from '../components/auth/auth-form';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function AuthPage() {

  const [isLoading, setILoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then(session => {
      if(session){
        router.replace('/');
      }else{
        setILoading(false);
      }
    })
  }, [router]);

  if(isLoading){
    return<p>Loading...</p>
  }

  return <AuthForm />;
}

export default AuthPage;