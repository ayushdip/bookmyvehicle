import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import DealerCurr from './components/DealerCurr';
import DealerHistory from './components/DealerHistory';
import DealerHome from './components/DealerHome';
import DealerSearch from './components/DealerSearch';
import DriverHistory from './components/DriverHistory';
import DriverHome from './components/DriverHome';
import DriverRequest from './components/DriverRequest';
import DriverUpcoming from './components/DriverUpcoming';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NavbarDriver from './components/NavbarDriver';
import Profile from './components/Profile';
import { auth } from './Firebase';
import { useStateValue } from './StateProvider';

function App() {
  const [{user},dispatch] = useStateValue();
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch({
          type : 'SET_USER',
          user : authUser,
        })
      }
      else{
        dispatch({
          type : 'SET_USER',
          user : null,
        })
      }
    })
  },[])
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/dealer/currbook" element={<><Navbar /><DealerCurr /></>}/>
        <Route path="/dealer/profile" element={<><Navbar /><Profile /></>}/>
        <Route path="/dealer/history" element={<><Navbar /><DealerHistory /></>}/>
        <Route path="/dealer/search" element={<><Navbar /><DealerSearch /></>}/>
        <Route path="/dealer" element={<><Navbar /><DealerHome /></>}/>
        <Route path="/driver/requests" element={<><NavbarDriver /><DriverRequest /></>}/>
        <Route path="/driver/upcoming" element={<><NavbarDriver /><DriverUpcoming /></>}/>
        <Route path="/driver/history" element={<><NavbarDriver /><DriverHistory /></>}/>
        <Route path="/driver/profile" element={<><NavbarDriver /><Profile /></>}/>
        <Route path="/driver" element={<><NavbarDriver /><DriverHome /></>}/>
        <Route path="/" element={<Home />} />
      
      </Routes>
    </div>
    </Router>
  );
}

export default App;
