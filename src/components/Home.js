import { Card, CardContent, Divider, Tab, Tabs, Typography } from '@material-ui/core'
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { useStateValue } from '../StateProvider';
import Login from './Login';
import Register from './Register';
import db from '../Firebase';
import CreateUser from './CreateUser';

function TabPanel(props){
    const {children, value, index, ...other} = props;
    return (
        <div role="tabpanel" hidden={value!=index}>
            {value==index && <Typography>{children}</Typography>}
        </div>
    )
}
const Home = () => {
  const [value,setValue] = useState(0);  
  const [{user},dispatch] = useStateValue();
  const [currUser,setCurrUser] = useState(null);
  const [show,setShow] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event, newValue)=>{
      setValue(newValue);
  }
  
  useEffect(()=>{
      console.log(user);
      setShow(true);
    if(user){
        db.collection('Users').where('email', '==', user?.email).onSnapshot(snapshot=>
        {
            if(snapshot.docs.length==0){
                navigate('/createForm');
            }
            else{
                snapshot.docs.map((doc)=>setCurrUser(doc.data()))
            }
        });
        
    }
  },[user])
  useEffect(()=>{
    AOS.init();
  },[])
  useEffect(()=>{
    if(currUser?.role=="dealer"){
        dispatch({
            type : 'SET_CURRUSER',
            currUser : currUser,
          })
        navigate("/dealer");
    }
    else if(currUser?.role=="driver"){
        dispatch({
            type : 'SET_CURRUSER',
            currUser : currUser,
        })
        navigate("/driver");
    }
  },[currUser])
  return (
    

      <div data-aos="zoom-in" className="Home">
      <Card variant='outlined' style={{maxWidth : "400px",margin : "4vw"}}>
              <Tabs textColor='primary' indicatorColor='primary' variant='fullWidth' value={value} onChange={handleChange}>
                  <Tab label="Login"></Tab>
                  <Tab label="Register"></Tab>
              </Tabs>
              <Divider />
              <CardContent>
              <TabPanel value={value} index={0}>
                  <Login />
              </TabPanel>
              <TabPanel value={value} index={1}>
                  <Register />
              </TabPanel>
      </CardContent>
      </Card>
      </div>
    
    
  )
}

export default Home;