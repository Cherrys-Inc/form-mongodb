
import React,{useState,useEffect} from 'react';
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Mainpage from './Components/Main';
import { auth } from './firebase'; 
import {login} from "./features/userSlice"
import {useDispatch} from "react-redux"
import Form from './Components/Form';
import Display from './Components/Display';

function App() {
  
  const [loggedIn,setLoggedIn]=useState(true);
  const em=JSON.parse(localStorage.getItem("user")).email
  const dispatch=useDispatch();
 
  useEffect(() => {
    dispatch(login(localStorage.getItem("user")))
    auth.onAuthStateChanged((user) =>{
    if(user)
    {
      return (setLoggedIn(true));
    }
    else{
      
      setLoggedIn(false);
      
    
    }
  })
  }, [])
  return (
    <div>
    
    <Router>
      
      
      <Routes>

        
        <Route path='/profile' element={<Mainpage />}></Route> 
        <Route exact path='/' element={<Login />}></Route>
        <Route path='/form' element={<Form />}></Route>
        <Route path='/display/:em' element={<Display email={em} />} ></Route>
      
      </Routes>
    </Router>  
      </div>
    );
  

}

export default App;
