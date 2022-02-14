import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@material-ui/core'
import { CircularProgress, TextField } from '@mui/material'
import Cities,{States} from './Geography'
import db, { auth } from '../Firebase'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import Aos from 'aos'
const Register = () => {
    const [index,setIndex] = useState(0);
    const [cityIndex,setCityIndex] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [userInfo,setUserInfo] = useState({role : "dealer",state : States[0]});
    const [spinner,setSpinner] = useState(false);
    const [err,setErr] = useState({});
    const [isSubmit,setIsSubmit] = useState(false);
    const [message,setMessage] = useState(false);
    const navigate = useNavigate();
    const validateForm = (userInfo)=>{
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        let phoneno = /^\d{10}$/;
        if(!userInfo.name){
            errors.name = "Name is required";
        }
        if(!userInfo.email){
            errors.email = "Email is required";
        }
        else if(!regex.test(userInfo.email)){
            errors.email = "Email is not valid";
        }
        if(!userInfo.password){
            errors.password = "Password is required";
        }
        if(!userInfo.address){
            errors.address = "Address is required";
        }
        if(!userInfo.contact){
            errors.contact = "Contact is required";
        }
        else if(!phoneno.test(userInfo.contact)){
            errors.contact = "Contact number is not valid";
        }
        return errors;

    }
    useEffect(()=>{
        if(Object.keys(err).length==0 && isSubmit){
            //console.log("sdsdsd");
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
                        state : States[index],
                        city : Cities[index+1][cityIndex]
                    })
                    setSpinner(false);
                    navigate('/');
                }
            })
            .catch((err)=>{setMessage(true);setSpinner(false)});
        }
        else{
            console.log("Wrong");
        }
    },[err])
    const registerUser = (e) => {
        setIsSubmit(true);
        setErr(validateForm(userInfo));
        
        
        
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
    useEffect(()=>{
        Aos.init();
    },[])
  return (
    <div data-aos="fade-up" className="Register">
        <TextField id="name" error={err.hasOwnProperty("name")} helperText={err.name} value={userInfo.name} fullWidth label="Name" variant="standard" style={{marginBottom : "1vw"}} onChange={e=>{
            setUserInfo({...userInfo,name : e.target.value})
        }}></TextField>
        
        <TextField error={err.hasOwnProperty("email")} helperText={err.email} fullWidth type="email" value={userInfo.email} onChange={e=>setUserInfo({...userInfo,email : e.target.value})} label="Email" variant="standard" style={{marginBottom : "1vw"}}></TextField>
    
        <TextField error={err.hasOwnProperty("password")} helperText={err.password} fullWidth type="password" value={userInfo.password} onChange={e=>setUserInfo({...userInfo,password : e.target.value})} label="Password" variant="standard" style={{marginBottom : "1vw"}}></TextField>
        <TextField error={err.hasOwnProperty("contact")} helperText={err.contact} fullWidth type="text" label="Contact no" value={userInfo.contact} onChange={e=>setUserInfo({...userInfo,contact : e.target.value})} variant="standard" style={{marginBottom : "1vw"}}></TextField>
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
        
        <TextField error={err.hasOwnProperty("address")} helperText={err.address} fullWidth type="text" label="Address" value={userInfo.address} onChange={e=>setUserInfo({...userInfo,address : e.target.value})} variant="standard" style={{marginBottom : "1vw"}}></TextField>
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
        {
            message?<Typography variant='subtitle2' color="error">Try with different email id</Typography>:<></>
        }
        <Button onClick={registerUser} fullWidth variant='contained' color="primary">Register</Button>

    </div>
  )
}

export default Register