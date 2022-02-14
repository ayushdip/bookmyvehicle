import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider'
import { Card,CardContent, TextField,CardActions, Button, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import db from '../Firebase';
import firebase from "firebase";
import { useNavigate } from 'react-router-dom';
const BookDriver = () => {
    const [{booking,currUser},dispatch] = useStateValue();
    const [item,setItem] = useState();
    const [quantity,setQuantity] = useState();
    const [jdate,setDate] = useState(null);
    const [open,setOpen] = useState(false);
    const [index,setIndex] = useState(0);
    const [err,setErr] = useState({});
    const [isSubmit,setIsSubmit] = useState(false);
    const navigate = useNavigate();
    
    const validate = (item,quantity,date) =>{
        const errors = {};
        if(!item){
            errors.item = "Item is required";
        }
        if(!quantity){
            errors.quantity = "Quantity is required";
        }
        if(!jdate){
            errors.date = "Journey Date is required";
        }
        return errors;
    }
    useEffect(()=>{
        if(Object.keys(err).length==0 && isSubmit){
            db.collection('Appointments').add({
                dealerEmail : currUser?.email,
                driverEmail : booking?.driverEmail,
                item : item,
                quantity : quantity,
                date : firebase.firestore.Timestamp.fromDate(new Date(jdate)),
                status : 'pending',
                vehicle : booking?.driverVehicle?.[index],
                bookingDate : firebase.firestore.FieldValue.serverTimestamp(),
                from : booking?.from,
                to : booking?.to
            })
            navigate("/dealer/currbook");
        }
        else{
            console.log(err);
        }
    },[err]) 
    const sendRequest = ()=>{
        setIsSubmit(true);
        setErr(validate(item,quantity));
    }
    const handleOpen = ()=>{
        setOpen(true);
    }
    const handleClose = ()=>{
        setOpen(false);
    }
    const handleChange = (e)=>{
        setIndex(e.target.value);
    }
  return (
    <div style={{display : "flex",margin : "auto",maxWidth : "400px",marginTop : "2vh"}}>
        <Card style={{minWidth : "260px"}}>
            <CardContent>
                <TextField value={currUser?.name} disabled fullWidth type="text" label="Dealer Name" variant="standard" style={{marginBottom : "1vw"}}></TextField>
                <br></br>
                <TextField value={booking?.driverName} disabled fullWidth type="text" label="Driver Name" variant="standard"></TextField>
                <TextField value={booking?.from} disabled fullWidth type="text" label="From" variant="standard"></TextField>
                <TextField value={booking?.to} disabled fullWidth type="text" label="To" variant="standard"></TextField>
                <TextField error={err.hasOwnProperty("item")} helperText={err.item} onChange={(e)=>setItem(e.target.value)} value={item} fullWidth type="text" label="Item to be transported" variant="standard"></TextField>
                <TextField error={err.hasOwnProperty("quantity")} helperText={err.quantity} onChange={(e)=>setQuantity(e.target.value)} value={quantity} fullWidth type="text" label="Weight to be transported" variant="standard"></TextField>
                <TextField error={err.hasOwnProperty("date")} helperText={err.date} onChange={(e)=>setDate(e.target.value)} value={jdate} fullWidth type='date' label="Journey Date" variant='standard'></TextField>
                <FormControl variant='standard' fullWidth style={{marginBottom : "2vw"}}>
                    <InputLabel>Select Vehicle</InputLabel>
                    <Select fullWidth open={open} onClose={handleClose} onOpen={handleOpen} value={index} label="Select Vehicle"
                        onChange={handleChange}>
                        {
                            booking?.driverVehicle?.map((s,i)=><MenuItem value={i}>{s?.data?.model} {s?.data.load} Ton</MenuItem>)
                        }
                        
                    </Select>
                </FormControl>
            </CardContent>
            <CardActions>
                <Button size="small" fullWidth onClick={sendRequest} variant="contained" color="primary">Send Request</Button>
            </CardActions>
        </Card>
    </div>
  )
}

export default BookDriver