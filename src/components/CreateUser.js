import React, { useEffect, useState } from 'react'
import { FormLabel,RadioGroup,FormControlLabel,Radio,Button,TextField,MenuItem,FormControl,Select,InputLabel, Typography } from '@material-ui/core';
import Cities, { States } from './Geography';
import { useStateValue } from '../StateProvider';
import db from '../Firebase';
import { useNavigate } from 'react-router-dom';
const CreateUser = () => {
    const [index,setIndex] = useState(0);
    const [cityIndex,setCityIndex] = useState(0);
    const [open,setOpen] = useState(false);
    const [open1,setOpen1] = useState(false);
    const [name,setName] = useState("");
    const [contact,setContact] = useState("");
    const [address,setAddress] = useState("");
    const [role,setRole] = useState("dealer");
    const [{user},dispatch] = useStateValue();
    const [err,setErr] = useState({});
    const [isSubmit,setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const validateForm = ()=> {
        let errors = {};
        let phoneno = /^\d{10}$/;
        if(!name){
            errors.name = "Name is required";
        }
        if(!address){
            errors.address = "Address is required";
        }
        if(!contact){
            errors.contact = "Contact is required";
        }
        else if(!phoneno.test(contact)){
            errors.contact = "Contact number is not valid";
        }
        return errors;

    }
    const handleOpen = ()=>{
        setOpen(true);
    }
    const handleOpen1 = ()=>{
        setOpen1(true);
    }
    const handleClose = ()=>{
        setOpen(false);
    }
    const handleClose1= ()=>{
        setOpen1(false);
    }
    const handleChange = (e) =>{
        setIndex(e.target.value);
    }
    const handleChange1 = (e)=>{
        setCityIndex(e.target.value);
    }
    useEffect(()=>{
        if(Object.keys(err).length==0 && isSubmit){
            db.collection('Users').add({
                email : user.email,
                name : name,
                contact : contact,
                state : States[index],
                city : Cities[index+1][cityIndex],
                address : address,
                role : role
            })
            // console.log(name,contact,States[index],Cities[index+1][cityIndex],address,role);
            navigate('/');
        }
    },[err])
    const registerUser = ()=>{
        setIsSubmit(true);
        setErr(validateForm());
    }
  return (
    <div className='createUser' style={{display : "flex",flexDirection : "column",margin : "auto",minWidth : "280px",maxWidth : "600px",border : '1px solid whitesmoke',padding : '1vw'}}>
        <Typography variant="h6" color='primary'>Register With Us</Typography>
        <TextField error={err.hasOwnProperty("name")} helperText={err.name} fullWidth onChange={(e)=>setName(e.target.value)} label="Name" variant="standard" style={{marginBottom : "1vh"}}></TextField>
        <TextField error={err.hasOwnProperty("contact")} helperText={err.contact} fullWidth onChange={(e)=>setContact(e.target.value)} type="text" label="Contact no" variant="standard" style={{marginBottom : "1vw"}}></TextField>
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
        
        <TextField error={err.hasOwnProperty("address")} helperText={err.address} onChange={(e)=>setAddress(e.target.value)} fullWidth type="text" label="Address" style={{marginBottom : "1vw"}}></TextField>
        <FormControl fullWidth>
            <FormLabel style={{marginRight : "auto"}}><b>Register Profile as</b></FormLabel>
            <RadioGroup defaultValue="dealer" onChange={(e)=>setRole(e.target.value)}>
                <FormControlLabel value="dealer" label="Dealer" control={<Radio color='primary' />}></FormControlLabel>
                <FormControlLabel value="driver" label="Driver" control={<Radio color="primary" />}></FormControlLabel>
            </RadioGroup>
        </FormControl>
        <Button onClick={registerUser} fullWidth variant='contained' color="primary">Register</Button>
    </div>
  )
}

export default CreateUser;