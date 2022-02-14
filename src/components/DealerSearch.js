import { Button, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Card,CardActions,CardContent } from '@material-ui/core';
import { useState } from 'react';
import Cities,{States} from './Geography';
import DriverList from './DriverList';
import db from '../Firebase';
const DealerSearch = () => {
    const [open,setOpen] = useState(false);
    const [index,setIndex] = useState(0);
    const [open1,setOpen1] = useState(false);
    const [index1,setIndex1] = useState(0);
    const [open2,setOpen2] = useState(false);
    const [index2,setIndex2] = useState(0);
    const [open3,setOpen3] = useState(false);
    const [index3,setIndex3] = useState(0);
    const [search,setSearch] = useState(false);
    const [driverList1,setDriverList1] = useState([]);
    const [driverList2,setDriverList2] = useState([]);
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
    const searchDriver = ()=>{
      const fromState = States[index];
      const fromCity = Cities[index+1][index1];
      const toState = States[index2];
      const toCity = Cities[index2+1][index3];
      db.collection('Routes').where('fromCity','in',[fromCity,toCity]).onSnapshot((snap)=>setDriverList1(snap.docs.map((doc)=>(doc.data().email))));
      db.collection('Routes').where('toCity','in',[fromCity,toCity]).onSnapshot((snap)=>setDriverList2(snap.docs.map((doc)=>(doc.data().email))));  
      setSearch(true);
    }
    useEffect(()=>{
      setDriverList1([...driverList1,...driverList2]);

    },[driverList2])
  return (<>
    <div className='DealerSearch' style={{margin:"2vw",marginTop : '2vw', display : "flex",justifyContent :"flex-start",flexWrap : "wrap"}}>
        <Card style={{minWidth : "260px",margin : "1vw"}}>
            <CardContent>
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
            </CardContent>
            <CardActions>
                <Button onClick={searchDriver} variant="contained" fullWidth color="primary">Search</Button>
            </CardActions>
        </Card>   
        {
          search && driverList1?.length==0?<p>No drivers found in this route. Try some other route</p>:<></>
        }
        <div style={{minWidth : "200px",margin:"1vw",display:"flex",flexWrap : "wrap"}}>
        {
          driverList1?.filter(function(item, pos) {
            return driverList1?.indexOf(item) == pos;
          })?.map((driver)=>(<DriverList email={driver} from={Cities[index+1][index1]} to={Cities[index2+1][index3]}/>))
        }     
        
        
           
        </div>
    </div>
    
    </>
  )
}

export default DealerSearch;