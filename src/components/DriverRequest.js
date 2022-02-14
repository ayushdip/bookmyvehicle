import { Button, Card, CardActions, CardContent, Divider, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider';
import DetailsHelper from './DetailsHelper';
import firebase from 'firebase';
import db from '../Firebase';
import { useNavigate } from 'react-router-dom';

const DriverRequest = () => {
  const [{currUser},dispatch] = useStateValue();
  const [booked,setBooked] = useState();
  const navigate = useNavigate();
  useEffect(()=>{

    db.collection('Appointments')
    .where('date','>=',firebase.firestore.Timestamp.fromDate(new Date()))
    .where('driverEmail','==',currUser?.email)
    .where('status','==','pending')
    .orderBy('date','desc')
    .onSnapshot(snap=>setBooked(snap.docs.map(doc=>({id : doc.id,data : doc.data()}))));
    console.log(booked);
  },[])
  const declineBooking = (id) =>{
      db.collection('Appointments').doc(id).update('status','Cancelled By Driver');
      navigate('/driver/history');
  }
  const acceptBooking = (id) =>{
    db.collection('Appointments').doc(id).update('status','Accepted');
    navigate('/driver/upcoming');
  }
  return (
    <div className='driverRequest' style={{width : "100%",display : "flex",justifyContent:"center",marginTop : "3vh"}}>
      <div className="driverMid" style={{minWidth : "280px",display : "flex",flexDirection : "column"}}>
          <Typography variant="h4" color="primary">Pending Requests</Typography>
          <Divider />
          {
            booked && booked?.length==0?<Typography variant="p" color="error">No Request for you. Add more routes and vehicles to attract dealers</Typography>:<></>
          }
          {
            booked?.map((book)=>(
              <Card style={{marginTop : "1vh"}}>
                <CardContent>
                    <DetailsHelper email={book?.data?.dealerEmail} />
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Route : {book?.data?.from} --- {book?.data?.to}</Typography>
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Item : {book?.data?.item} , {book?.data?.quantity}</Typography>
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Journey Date : {new Date(book?.data?.date?.toDate()).toLocaleDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Booked On : {new Date(book?.data?.bookingDate?.toDate()).toLocaleDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Vehicle : {book?.data?.vehicle?.data?.model},Load -  {book?.data?.vehicle?.data?.load} Ton</Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={()=>acceptBooking(book?.id)} color="primary" variant="contained">Accept</Button>
                    <Button onClick={()=>declineBooking(book?.id)} color="secondary" variant="contained">Decline</Button>
                </CardActions>
              </Card>
            ))
          }
      </div>
    </div>
  )
}

export default DriverRequest