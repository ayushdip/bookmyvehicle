import React, { useState } from 'react'
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@material-ui/core'
import { CircularProgress, TextField } from '@mui/material'
import Cities,{States} from './Geography'
import db, { auth } from '../Firebase'
import { BrowserRouter, useNavigate } from 'react-router-dom'
const Register = () => {
    const [index,setIndex] = useState(0);
    const [cityIndex,setCityIndex] = useState('');
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [userInfo,setUserInfo] = useState({role : "dealer",state : States[0]});
    const [spinner,setSpinner] = useState(false);
    const navigate = useNavigate();
    const registerUser = (e) => {
        setSpinner(true);
        auth.createUserWithEmailAndPassword(userInfo.email,userInfo.password)
        .then((auth)=>{
            if(auth){
                db.collection('Users').add({
                    name : userInfo.name,
                    email : userInfo.email,
                    role : userInfo.role,
                    address : userInfo.address,
                    contact : userInfo.contact,
                    state : userInfo.state,
                    city : userInfo.city
                })
                setSpinner(false);
                navigate('/');
            }
        })
    }
    const handleChange = (event) => {
        setIndex(event.target.value);
        setUserInfo({...userInfo,state : States[event.target.value]})
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleChange1 = (event) => {
        setCityIndex(event.target.value);
        setUserInfo({...userInfo,city : Cities[index+1][event.target.value]})
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleOpen1 = () => {
        setOpen1(true);
    };
    
  return (
    <div className="Register">
        <TextField id="name" value={userInfo.name} fullWidth label="Name" variant="standard" style={{marginBottom : "1vw"}} onChange={e=>{
            setUserInfo({...userInfo,name : e.target.value})
        }}></TextField>
        
        <TextField fullWidth type="email" value={userInfo.email} onChange={e=>setUserInfo({...userInfo,email : e.target.value})} label="Email" variant="standard" style={{marginBottom : "1vw"}}></TextField>
    
        <TextField fullWidth type="password" value={userInfo.password} onChange={e=>setUserInfo({...userInfo,password : e.target.value})} label="Password" variant="standard" style={{marginBottom : "1vw"}}></TextField>
        <TextField fullWidth type="text" label="Contact no" value={userInfo.contact} onChange={e=>setUserInfo({...userInfo,contact : e.target.value})} variant="standard" style={{marginBottom : "1vw"}}></TextField>
        <br />
        <FormControl variant='standard' fullWidth style={{marginBottom : "2vw"}}>
            <InputLabel>State</InputLabel>
            <Select fullWidth open={open} onClose={handleClose} onOpen={handleOpen} value={index} label="State"
                onChange={handleChange}>
                {
                    States.map((s,i)=><MenuItem value={i}>{s}</MenuItem>)
                }
            </Select>
        </FormControl>
        <FormControl variant='standard' fullWidth style={{marginBottom : "2vw"}}>
            <InputLabel>City</InputLabel>
            <Select fullWidth open={open1} onClose={handleClose1} onOpen={handleOpen1} value={cityIndex} label="City"
                onChange={handleChange1}>
                {
                    Cities[index + 1].map((c,i)=><MenuItem value={i}>{c}</MenuItem>)
                }
            </Select>
        </FormControl>
        
        <TextField fullWidth type="text" label="Address" value={userInfo.address} onChange={e=>setUserInfo({...userInfo,address : e.target.value})} variant="standard" style={{marginBottom : "1vw"}}></TextField>
        <FormControl fullWidth>
            <FormLabel style={{marginRight : "auto"}}><b>Register Profile as</b></FormLabel>
            <RadioGroup defaultValue="dealer" onChange={e=>setUserInfo({...userInfo,role : e.target.value})}>
                <FormControlLabel value="dealer" label="Dealer" control={<Radio color='primary' />}></FormControlLabel>
                <FormControlLabel value="driver" label="Driver" control={<Radio color="primary" />}></FormControlLabel>
            </RadioGroup>
        </FormControl>
        {
            spinner?<CircularProgress />:<></>
        }
        
        <Button onClick={registerUser} fullWidth variant='contained' color="primary">Register</Button>

    </div>
  )
}

export default Register