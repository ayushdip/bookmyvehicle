import { Card, CardContent, Divider, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import DetailsHelper from './DetailsHelper';
import firebase from 'firebase';
import db from '../Firebase';
import { useStateValue } from '../StateProvider';
import Aos from 'aos';

const DealerHistory = () => {
  const [booked,setBooked] = useState();
  const [{currUser},dispatch] = useStateValue();
  useEffect(()=>{
    db.collection('Appointments')
    .where('date','<',firebase.firestore.Timestamp.fromDate(new Date()))
    .where('dealerEmail','==',currUser?.email)
    .orderBy('date','desc')
    .onSnapshot(snap=>setBooked(snap.docs.map(doc=>({id : doc.id,data : doc.data()}))));
    console.log(booked);
    Aos.init();
  },[])
  return (
    <div data-aos="zoom-in" className='dealerHistory' style={{width : "100%",display : "flex",justifyContent:"center",marginTop : "3vh"}}>
      <div className="dealerMid" style={{minWidth : "280px",display : "flex",flexDirection : "column"}}>
          <Typography variant="h4" color="primary">Previous Bookings</Typography>
          <Divider />
          {
            booked && booked?.length==0?<Typography variant="p" color="error">You don't have any previous booking. Navigate to Search a Driver !</Typography>:<></>
          }
          {
            booked?.map((book)=>(
              <Card style={{marginTop : "1vh"}}>
                <CardContent>
                    <DetailsHelper email={book?.data?.driverEmail} />
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Route : {book?.data?.from} --- {book?.data?.to}</Typography>
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Item : {book?.data?.item} , {book?.data?.quantity}</Typography>
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Journey Date : {new Date(book?.data?.date?.toDate()).toLocaleDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Booked On : {new Date(book?.data?.bookingDate?.toDate()).toLocaleDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Vehicle : {book?.data?.vehicle?.data?.model},Load -  {book?.data?.vehicle?.data?.load} Ton</Typography>
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Status : {book?.data?.status}</Typography>
                </CardContent>
              </Card>
            ))
          }
      </div>
    </div>
  )
}

export default DealerHistory