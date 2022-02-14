import { Button, Card, CardActions, CardContent, Divider, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider';
import DetailsHelper from './DetailsHelper';
import firebase from 'firebase';
import db from '../Firebase';
import AOS from 'aos';
const DriverUpcoming = () => {
  const [{currUser},dispatch] = useStateValue();
  const [booked,setBooked] = useState();
  const [cancel,setCancel] = useState();
  useEffect(()=>{
    AOS.init();
    db.collection('Appointments')
    .where('date','>=',firebase.firestore.Timestamp.fromDate(new Date()))
    .where('driverEmail','==',currUser?.email)
    .where('status','==','Accepted')
    .orderBy('date','desc')
    .onSnapshot(snap=>setBooked(snap.docs.map(doc=>({id : doc.id,data : doc.data()}))));
    db.collection('Appointments')
    .where('date','>=',firebase.firestore.Timestamp.fromDate(new Date()))
    .where('driverEmail','==',currUser?.email)
    .where('status','in',['Cancelled By Dealer','Cancelled By Driver'])
    .orderBy('date','desc')
    .onSnapshot(snap=>setCancel(snap.docs.map(doc=>({id : doc.id,data : doc.data()}))));
    
  },[])
  return (
    <>
    <div data-aos='zoom-in' className='driverUpcoming' style={{width : "100%",display : "flex",justifyContent:"center",marginTop : "3vh"}}>
      <div className="driverMid" style={{minWidth : "280px",display : "flex",flexDirection : "column"}}>
          <Typography variant="h4" color="primary">Upcoming Journeys</Typography>
          <Divider />
          {
            booked && booked?.length==0?<Typography variant="p" color="error">No upcoming journeys. Accept dealers request to view this section</Typography>:<></>
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
                    <Typography variant="body2" color='textSecondary' style={{textAlign : "left"}}>Status : Accepted</Typography>               
                </CardContent>
              </Card>
            ))
          }
      </div>
      
    </div>
    <div data-aos="zoom-in" className='driverUpcoming' style={{width : "100%",display : "flex",justifyContent:"center",marginTop : "3vh"}}>
      <div className="driverMid" style={{minWidth : "280px",display : "flex",flexDirection : "column"}}>
          <Typography variant="h4" color="secondary">Cancelled Journeys </Typography>
          <Divider />
          {
            cancel && cancel?.length==0?<Typography variant="p" color="error">No cancelled journeys in future</Typography>:<></>
          }
          {
            cancel?.map((book)=>(
              <Card style={{marginTop : "1vh"}}>
                <CardContent>
                    <DetailsHelper email={book?.data?.dealerEmail} />
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Route : {book?.data?.from} --- {book?.data?.to}</Typography>
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Item : {book?.data?.item} , {book?.data?.quantity}</Typography>
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Journey Date : {new Date(book?.data?.date?.toDate()).toLocaleDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Booked On : {new Date(book?.data?.bookingDate?.toDate()).toLocaleDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Vehicle : {book?.data?.vehicle?.data?.model},Load -  {book?.data?.vehicle?.data?.load} Ton</Typography>
                    <Typography variant="body2" color='textSecondary' style={{textAlign : "left"}}>Status : {book?.data?.status}</Typography>               
                </CardContent>
              </Card>
            ))
          }
      </div>
      
    </div>
    </>
  )
}

export default DriverUpcoming