import { Button, CircularProgress, Typography } from '@material-ui/core'
import { LinearProgress, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../Firebase'
import { useStateValue } from '../StateProvider'
import Aos from 'aos'
const Login = () => {
  const [{},dispatch] = useStateValue();
  const navigate = useNavigate();
  const [spinner,setSpinner] = useState(false);
  const [err,setErr] = useState(false);
  const [mess,setMess] = useState(false);
  const userLogin = () => {
    setSpinner(true);
    auth.signInWithEmailAndPassword(email,password)
    .then((auth)=>{
      if(auth){
        setSpinner(false);
        navigate('/');
      }
    })
    .catch((error)=>{
      setErr(true);
      setSpinner(false);
    });
    
  }
  const passwordlessLogin = () =>{
    const actionCodeSettings = {
      url : 'https://bookmyvehicle-5eab4.web.app/login',
      handleCodeInApp : true
    };
    auth.sendSignInLinkToEmail(email,actionCodeSettings)
    .then(()=>{
      setMess(true);
      window.localStorage.setItem('emailForSignIn',email);
    })
    .catch((e)=>{
      setErr(true);
    })
  }
  useEffect(()=>{
    Aos.init();
  },[])
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  
  return (
    <div data-aos="fade-in" data-aos-duration="3000" className="Login">
        <TextField onChange={(e)=>setEmail(e.target.value)} fullWidth id="standard-basic" type="email" label="Email" variant="standard" style={{marginBottom : "1vw"}}></TextField>
        <br></br>
        <TextField onChange={(e)=>setPassword(e.target.value)} fullWidth id="standard-basic" type="password" label="Password" variant="standard"></TextField>
        <br /> <br />
        {
          spinner?<CircularProgress />:<></>
        }
        {
          err?<Typography variant='subtitle2' color='error'>Username or password incorrect</Typography>:<></>
        }
        {
          mess?<Typography variant='subtitle2' color='success'>Email is sent to your registered id. Click the link to sign In. Please check spam folder</Typography>:<></>
        }
        <Button onClick={userLogin} fullWidth variant='contained' color="primary">Login</Button>
        
        <Button style={{marginTop : '1vw'}} onClick={passwordlessLogin} fullWidth variant='contained' color="secondary">Login with Email Link</Button>
    </div>
  )
}

export default Login