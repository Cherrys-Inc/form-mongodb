import React,{useState} from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./display.css"

const Display = (props) => {
    const [state,setState]=useState("")
    const navigate=useNavigate();
    
    useEffect(() => {
        axios.get('http://localhost:5000/display/'+props.email)
        .then(response => {
            setState(response.data);
            console.log(response.data)
        })
        .catch(function (error){
            console.log(error);
        })
    }, [0])
    return (
    <div className='display-data'>
        
        Your details:<br></br>
        
        First Name:{state.firstname}<br></br>
    
        Last Name:{state.lastname}<br></br>
        Mobile:{state.mobile}<br></br>
        Email:{state.email}<br></br>
        Course selected:{state.course}<br></br>
        Dob:{state.dob}<br></br>
        <button onClick={() => {navigate('/profile')}}>Back</button>
        


           
            

    </div>);
}

export default Display;