import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { auth } from '../Firebase'

const SignWithEmail = () => {
    const navigate = useNavigate();
    const [error,setError] = useState();
    useEffect(()=>{
        if(auth.isSignInWithEmailLink(window.location.href)){
            let email = window.localStorage.getItem('emailForSignIn');
            if(!email){
                email = window.prompt("Please provide your email for confirmation");
            }
            auth.signInWithEmailLink(email,window.location.href)
            .then((result)=>{
                window.localStorage.removeItem('emailForSignIn');
                navigate('/');
            })
            .catch((err)=>{
                console.log(err);
                setError(error);
            })
        }
    },[])
  return (
    <Typography variant ="h1">{error}</Typography>

  )
}

export default SignWithEmail