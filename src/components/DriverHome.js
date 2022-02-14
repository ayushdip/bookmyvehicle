import { Button, Card, CardActions, CardContent, Divider, FormControl, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { ListItemButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../StateProvider'
import Cities, { States } from './Geography';
import db from '../Firebase';

const DriverHome = () => {
    const [{user},dispatch] = useStateValue();
    const navigate = useNavigate();
    const [open,setOpen] = useState(false);
    const [index,setIndex] = useState(0);
    const [open1,setOpen1] = useState(false);
    const [index1,setIndex1] = useState(0);
    const [open2,setOpen2] = useState(false);
    const [index2,setIndex2] = useState(0);
    const [open3,setOpen3] = useState(false);
    const [index3,setIndex3] = useState(0);
    const [model,setModel] = useState("");
    const [vehno,setVehno] = useState("");
    const [load,setLoad] = useState(0);
    const [vehList,setVehList] = useState();
    const [routeList,setRouteList] = useState();
    useEffect(()=>{
        if(!user){
            navigate('/');
        }
        else{
            db.collection('Vehicles').where('email','==',user?.email)
            .onSnapshot((snap)=>setVehList(snap.docs.map((doc)=>({id : doc.id,data : doc.data()}))));
            db.collection('Routes').where('email','==',user?.email)
            .onSnapshot((snap)=>setRouteList(snap.docs.map((doc)=>({id : doc.id,data : doc.data()}))));
        }
    },[])
    const handleChange = (e)=>{
        setIndex(e.target.value)
    }
    const handleOpen = ()=>{
        setOpen(true);
    }
    const handleClose = ()=>{
        setOpen(false);
    }
    const handleChange1 = (e)=>{
        setIndex1(e.target.value)
    }
    const handleOpen1 = ()=>{
        setOpen1(true);
    }
    const handleClose1 = ()=>{
        setOpen1(false);
    }
    const handleChange2 = (e)=>{
        setIndex2(e.target.value)
    }
    const handleOpen2 = ()=>{
        setOpen2(true);
    }
    const handleClose2 = ()=>{
        setOpen2(false);
    }
    const handleChange3 = (e)=>{
        setIndex3(e.target.value);
    }
    const handleOpen3 = ()=>{
        setOpen3(true);
    }
    const handleClose3 = ()=>{
        setOpen3(false);
    }
    const addVehicle = ()=>{
        db.collection('Vehicles').add({
            email : user?.email,
            vehno : vehno,
            model : model,
            load : load 
        });
        setVehno("");
        setModel("");
        setLoad("");
    }
    const deleteVehicle = (id) =>{
        db.collection('Vehicles').doc(id).delete();
    }
    const deleteRoute = (id) =>{
        db.collection('Routes').doc(id).delete();
    }
    const addRoute = ()=>{
        db.collection('Routes').add({
            email : user?.email,
            fromState : States[index],
            fromCity : Cities[index+1][index1],
            toState : States[index2],
            toCity : Cities[index2+1][index3]
        })
        setIndex(0);
        setIndex1(0);
        setIndex2(0);
        setIndex3(0);
    }
  return (
    <div className='DriverHome' style={{display : "flex", marginTop : "5vh", justifyContent : "space-evenly",flexWrap : "wrap"}}>
        <Card style={{width : "40vw",minWidth : "300px",margin : "1vh"}}>
            <CardContent>
                <Typography variant="h5" style={{textAlign : "left"}} color="primary">Your Vehicles</Typography>
                <Divider />
                <TextField value={model} onChange={(e)=>setModel(e.target.value)} fullWidth type="text" label="Vehicle Model" variant="standard" />
                <TextField value={vehno} onChange={(e)=>setVehno(e.target.value)} fullWidth type="text" label="Vehicle Number" variant="standard" />
                <TextField value={load} onChange={(e)=>setLoad(e.target.value)} fullWidth type="number" label="Max Load (in Tons)" variant="standard" style={{marginBottom : "1vw"}}/>
                <Button onClick={addVehicle} variant="contained" color="primary" fullWidth style={{marginBottom : "1vw"}}>Add vehicle</Button>
                <Divider />
                <List>
                {
                    vehList?.map((veh)=>(
                        <ListItem>
                            <ListItemButton>
                                <ListItemText>
                                    {veh?.data?.model} {veh?.data?.load} {veh?.data?.vehno}
                                </ListItemText>
                                <ListItemAvatar>
                                    <IconButton onClick={()=>deleteVehicle(veh?.id)}>
                                        <Delete />
                                    </IconButton>
                                </ListItemAvatar>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
                </List>
            </CardContent>
        </Card>
        <Card style={{width : "40vw",minWidth : "300px"}}>
            <CardContent>
            <Typography variant="h5" style={{textAlign : "left"}} color="primary">Preferred Routes</Typography>
                <Divider />
            <FormControl fullWidth variant='standard' style={{marginBottom : "2vw"}}>
            <InputLabel>From State</InputLabel>
            <Select open={open} onClose={handleClose} onOpen={handleOpen} value={index} label="State"
                onChange={handleChange}>
                {
                    States.map((s,i)=><MenuItem value={i}>{s}</MenuItem>)
                }
            </Select>
            </FormControl>
            <FormControl fullWidth variant='standard' style={{marginBottom : "2vw"}}>
            <InputLabel>From City</InputLabel>
            <Select fullWidth open={open1} onClose={handleClose1} onOpen={handleOpen1} value={index1} label="State"
                onChange={handleChange1}>
                {
                    Cities[index+1].map((s,i)=><MenuItem value={i}>{s}</MenuItem>)
                }
            </Select>
            </FormControl>
            <FormControl fullWidth variant='standard' style={{marginBottom : "2vw"}}>
            <InputLabel>To State</InputLabel>
            <Select fullWidth open={open2} onClose={handleClose2} onOpen={handleOpen2} value={index2} label="State"
                onChange={handleChange2}>
                {
                    States.map((s,i)=><MenuItem value={i}>{s}</MenuItem>)
                }
            </Select>
            </FormControl>
            <FormControl fullWidth variant='standard' style={{marginBottom : "2vw"}}>
            <InputLabel>To City</InputLabel>
            <Select fullWidth open={open3} onClose={handleClose3} onOpen={handleOpen3} value={index3} label="State"
                onChange={handleChange3}>
                {
                    Cities[index2+1].map((s,i)=><MenuItem value={i}>{s}</MenuItem>)
                }
            </Select>
            </FormControl>
            <Button variant="contained" color="secondary" onClick={addRoute} fullWidth>Add Route</Button>
                <List>
                    {
                        routeList?.map((r)=>(<>
                            <ListItem>
                                <ListItemButton>
                                    <ListItemText>
                                    {r?.data?.fromCity} ({r?.data?.fromState}) ---- {r?.data?.toCity} ({r?.data?.toState})
                                    </ListItemText>
                                    <ListItemAvatar>
                                        <IconButton onClick={()=>deleteRoute(r?.id)}>
                                            <Delete />
                                        </IconButton>
                                    </ListItemAvatar>
                                </ListItemButton>
                            </ListItem>
                            <Divider /></>
                        ))
                    }
                    
                </List>
            </CardContent>
        </Card>
    </div>
  )
}

export default DriverHome