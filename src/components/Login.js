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
        
        <Button onClick={userLogin} fullWidth variant='contained' color="primary">Login</Button>
    </div>
  )
}

export default Login