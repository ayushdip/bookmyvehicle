import { Avatar, Button, Card, CardActions, CardContent, Divider, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../Firebase'
import { useStateValue } from '../StateProvider'
import AOS from 'aos';
const Profile = () => {
    const [{currUser},dispatch] = useStateValue();
    const navigate = useNavigate();
    const signOut = async() =>{
        await auth.signOut();
        navigate("/");
    }
    useEffect(()=>{
        AOS.init();
    },[])
  return (
    <div data-aos="zoom-in" className='Profile' style={{maxWidth : "400px",margin:"auto",marginTop : '2vw', display : "flex",alignItems : "center",justifyContent :"center"}}>
        <Card style={{minWidth : "260px"}}>
            <CardContent>
                <Typography variant="h5" style={{textAlign : "left"}} color="primary">Your Profile</Typography>
                <Divider />
                <Typography variant="body2" style={{textAlign : "left"}} color="textSecondary" >Name : {currUser?.name}</Typography>
                <Divider />
                <Typography variant="body2" style={{textAlign : "left"}} color="textSecondary" >Role : {currUser?.role}</Typography>
                <Divider />
                <Typography variant="body2" style={{textAlign : "left"}} color="textSecondary" >State : {currUser?.state}</Typography>
                <Divider />
                <Typography variant="body2" style={{textAlign : "left"}} color="textSecondary" >City : {currUser?.city}</Typography>
                <Divider />
                <Typography variant="body2" style={{textAlign : "left"}} color="textSecondary" >Address : {currUser?.address}</Typography>
                <Divider />
                <Typography variant="body2" style={{textAlign : "left"}} color="textSecondary" >Contact : {currUser?.contact}</Typography>
                <Divider />
                <Typography variant="body2" style={{textAlign : "left"}} color="textSecondary" >Email : {currUser?.email}<br /> 
               
                </Typography>
                <Divider />
            </CardContent>
            <CardActions>
            
                <Button size="small" onClick={signOut} color="secondary">Logout</Button>
            </CardActions>
        </Card>
    </div>
  )
}

export default Profile