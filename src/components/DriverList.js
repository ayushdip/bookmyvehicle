import { Button, Card, CardActions, CardContent, Divider, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import db from '../Firebase'
import { useStateValue } from '../StateProvider';

const DriverList = ({email,from,to}) => {
    const [driver,setDriver] = useState();
    const [veh,setVeh] = useState();
    const [{},dispatch] = useStateValue();
    const navigate = useNavigate();
    useEffect(()=>{
        db.collection('Users').where('email','==',email).onSnapshot((s)=>setDriver(s.docs.map(doc=>({id : doc.id,data:doc.data()}))));
        db.collection('Vehicles').where('email','==',email).onSnapshot((s)=>setVeh(s.docs.map(doc=>({id : doc.id,data:doc.data()}))));
    },[])
    const bookDriver = ()=>{
        dispatch({
            type : 'SET_BOOK',
            booking : {
                driverEmail : email,
                driverVehicle : veh,
                driverName : driver?.[0]?.data?.name,
                from : from,
                to : to
            }
            
        })
        navigate("/dealer/search/book");
    }
  return (
        <Card style={{minWidth : "200px",maxWidth : "100%",margin : "1vw",height : "auto"}}>
            <CardContent>
                  <Typography variant="h5" color="primary" style={{textAlign : "left"}}>{driver?.[0]?.data?.name}</Typography>
                  <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Contact : {driver?.[0]?.data?.contact}</Typography>
                  <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Email: {driver?.[0]?.data?.email}</Typography>
                  <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Address : {driver?.[0]?.data?.address}</Typography>
                  <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>State : {driver?.[0]?.data?.state}</Typography>
                  <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>City : {driver?.[0]?.data?.city}</Typography>
                  <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Vehicles : {veh?.length}</Typography>
                    
                  {
                      veh?.map((v)=>(
                        <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}> {v?.data?.model} , Capacity : {v?.data?.load} Ton </Typography>
                      ))
                  }
                  <Divider />
            </CardContent>
            <CardActions>
                <Button onClick={bookDriver} variant="contained" fullWidth color="secondary">Book Now</Button>
            </CardActions>
        </Card>
  )
}

export default DriverList