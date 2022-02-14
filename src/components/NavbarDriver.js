import { Avatar, Button, CssBaseline, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import db from '../Firebase'
import { AppBar } from '@material-ui/core'
import { useStateValue } from '../StateProvider'
import { Dehaze, ToggleOn } from '@material-ui/icons'
import { Link } from 'react-router-dom'


const NavbarDriver = () => { 
  const [{currUser},dispatch] = useStateValue();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("xs"));
  const [toggle,setToggle] = useState(true);
  // useEffect(()=>{
  //   if(email)
  //   db.collection('Users').where('email', '==', email).onSnapshot(snapshot=>snapshot.docs.map((doc)=>setCurrUser(doc.data())));
  // },[email])
  
  return (
    <div className='Navbar'>
      <CssBaseline />
      <AppBar position='sticky' elevation={24} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          { !isMatch?
          <Grid container alignItems='center'>
            <Grid item sm={4}>
              <Typography variant="h5"><Link to="/driver">Book My Vehicle</Link></Typography>
            </Grid>
            <Grid item sm={2}>
              <Typography variant="p"><Link to="/driver/requests">Dealer Request</Link></Typography>
            </Grid>
            <Grid item sm={2}>
              <Typography variant="p"><Link to="/driver/upcoming">Upcoming Journeys</Link></Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography variant="p"><Link to="/driver/history">Previous Bookings</Link></Typography>
            </Grid>
            <Grid item sm={1}>
                <Link to="/driver/profile">
              <Avatar>{currUser?.name?.[0]}</Avatar>
                </Link> 
            </Grid>
          </Grid>:
          <Grid container alignItems='center'>
            <Grid item xs={2}>
              <IconButton onClick={()=>setToggle(true)} style={{color : "white"}}><Dehaze /></IconButton>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h5"><Link to="/driver">Logo</Link></Typography>
            </Grid>
            <Grid item xs={2}>
                <Link to="/driver/profile">
              <Avatar>{currUser?.name?.[0]}</Avatar></Link>
            </Grid>
          </Grid>
          }
        </Toolbar>
      </AppBar>
      {
        isMatch?(
          <Drawer variant='temporary' anchor="left" open={toggle} color="primary"
          onClose={() => setToggle(false)} elevation="0">
            <List>
              <ListItem button>
                <ListItemIcon>
                  <ListItemText>
                    <Typography variant="h6"><Link to="/driver/requests">Dealer Request</Link></Typography>
                  </ListItemText>
                </ListItemIcon>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <ListItemText>
                    <Typography variant="h6"><Link to="/driver/upcoming">Upcoming Journeys</Link></Typography>
                  </ListItemText>
                </ListItemIcon>
              </ListItem>
              
              <ListItem button>
                <ListItemIcon>
                  <ListItemText>
                    <Typography variant="h6"><Link to="/driver/history">Previous Bookings</Link></Typography>
                  </ListItemText>
                </ListItemIcon>
              </ListItem>
            </List>
          </Drawer>
        ):<></>
      }
    </div>
    
  )
}

export default NavbarDriver