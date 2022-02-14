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
    const [date,setDate] = useState();
    const [open,setOpen] = useState(false);
    const [index,setIndex] = useState(0);
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(booking);
    },[]);
    const sendRequest = ()=>{
        db.collection('Appointments').add({
            dealerEmail : currUser?.email,
            driverEmail : booking?.driverEmail,
            item : item,
            quantity : quantity,
            date : firebase.firestore.Timestamp.fromDate(new Date(date)),
            status : 'pending',
            vehicle : booking?.driverVehicle?.[index],
            bookingDate : firebase.firestore.FieldValue.serverTimestamp(),
            from : booking?.from,
            to : booking?.to
        })
        navigate("/dealer/currbook");
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
                <TextField onChange={(e)=>setItem(e.target.value)} value={item} fullWidth type="text" label="Item to be transported" variant="standard"></TextField>
                <TextField onChange={(e)=>setQuantity(e.target.value)} value={quantity} fullWidth type="text" label="Weight to be transported" variant="standard"></TextField>
                <TextField onChange={(e)=>setDate(e.target.value)} value={date} fullWidth type='date' label="Journey Date" variant='standard'></TextField>
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