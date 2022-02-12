import { Button } from '@material-ui/core'
import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../Firebase'
import { useStateValue } from '../StateProvider'

const Login = () => {
  const [{},dispatch] = useStateValue();
  const navigate = useNavigate();
  const userLogin = () => {
    auth.signInWithEmailAndPassword(email,password)
    .then((auth)=>{
      if(auth){
        navigate('/');
      }
    })
    .catch((error)=>console.log(error));
    console.log(email);
    console.log(password);
  }
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  return (
    <div className="Login">
        <TextField onChange={(e)=>setEmail(e.target.value)} fullWidth id="standard-basic" type="email" label="Email" variant="standard" style={{marginBottom : "1vw"}}></TextField>
        <br></br>
        <TextField onChange={(e)=>setPassword(e.target.value)} fullWidth id="standard-basic" type="password" label="Password" variant="standard"></TextField>
        <br /> <br />
        <Button onClick={userLogin} fullWidth variant='contained' color="primary">Login</Button>
    </div>
  )
}

export default Login