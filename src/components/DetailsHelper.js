import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import db from '../Firebase';

const DetailsHelper = ({email}) => {
    const [person,setPerson] = useState();
    useEffect(()=>{
        db.collection('Users').where('email','==',email).onSnapshot((snap)=>setPerson(snap.docs.map((doc)=>({id : doc.id,data : doc.data()}))));
        console.log(person);
    },[email])
  return (  
    <>
        {
            person?.map((p)=>(<>
                <Typography variant="h6" color="primary" style={{textAlign : "left"}}>{p?.data?.name}</Typography>
                <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Email : {email}</Typography>
                <Typography variant="body2" color="textSecondary" style={{textAlign : "left"}}>Contact : {p?.data?.contact}1</Typography>
                </>
            ))
        }   
        
        
    </>
  )
}

export default DetailsHelper