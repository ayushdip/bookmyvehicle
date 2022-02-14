import { Button, Card, CardActions, CardContent, Divider, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
const DealerHome = () => {
    const [{user},dispatch] = useStateValue();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user){
            navigate('/');
        }
    },[])
  return (
    <div>DealerHome</div>
  )
}

export default DealerHome