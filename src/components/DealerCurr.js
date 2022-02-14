import { Button, Card, CardActions, CardContent, Divider, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import db from '../Firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase';
import DetailsHelper from './DetailsHelper';
const DealerCurr = () => {
  const [booked,setBooked] = useState();
  const [{currUser},dispatch] = useStateValue();
  useEffect(()=>{
    db.collection('Appointments').where('dealerEmail','==',currUser?.email)
    .where('date','>=',firebase.firestore.Timestamp.fromDate(new Date()))
    .orderBy('date')
    .onSnapshot(snap=>setBooked(snap.docs.map(doc=>({id : doc.id,data : doc.data()}))));
    console.log(booked);
  },[])
  return (
    <div className='dealerHome' style={{width : "100%",display : "flex",justifyContent:"center",marginTop : "3vh"}}>
      <div className="dealerMid" style={{minWidth : "280px",display : "flex",flexDirection : "column"}}>
          <Typography variant="h4" color="primary">Your Bookings</Typography>
          <Divider />
          {
            booked?.map((book)=>(
              <Card style={{marginTop : "1vh"}}>
                <CardContent>
                    <DetailsHelper email={book?.data?.driverEmail} />
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Route : {book?.data?.from} --- {book?.data?.to}</Typography>
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Journey Date : {new Date(book?.data?.date?.toDate()).toLocaleDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Booked On : {new Date(book?.data?.bookingDate?.toDate()).toLocaleDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Vehicle : {book?.data?.vehicle?.data?.model},Load -  {book?.data?.vehicle?.data?.load} Ton</Typography>
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Status : {book?.data?.status}</Typography>
                </CardContent>
                <CardActions>
                    <Button color="secondary" variant="contained" fullWidth>Cancel Booking</Button>
                </CardActions>
              </Card>
            ))
          }
      </div>
    </div>
  )
}

export default DealerCurr