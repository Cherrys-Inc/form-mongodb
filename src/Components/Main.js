import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes,Route,Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {auth} from "../firebase"
import { getAuth, RecaptchaVerifier ,signInWithPhoneNumber} from 'firebase/auth';
import {  logout,login } from '../features/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import userData from "../UserData.json"
import tick from "../assets/tick.png"
import Otp from './Otp';
import Form from './Form';



const Mainpage = () => {
    const [mobile, setMobile] = useState("")
    let userArray=userData;
    const otpauth= getAuth();
    const [verify,setVerify]=useState(false)
    
    const [viewOtpForm, setViewOtpForm] = useState(false);
    const navigate= useNavigate();
    const name=JSON.parse(localStorage.getItem("user")).name
    const email= JSON.parse(localStorage.getItem("user")).email
    const uid= JSON.parse(localStorage.getItem("user")).uid
    
    
    const dispatch=useDispatch();
    
       
    const signOut =()=>
    {
        auth.signOut();
        otpauth.signOut();

        localStorage.clear()
        dispatch(logout())
        navigate("/")
        userArray=userData

    }
    const updateVerification=()=>{
        console.log(localStorage.getItem("mobileVerified"))
        if (verify===true){
            
            localStorage.setItem("mobileVerified",true);
            const details=JSON.parse(localStorage.getItem("user"))
           
            
            
     }
     dispatch(login({name:name,email:email,uid:uid,IsMobileVerified:localStorage.getItem("mobileVerified")}))
       
       

    }
   
    const verifyNo = (e) => {
        e.preventDefault();

        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            "size":"invisible",
            'callback': (response) => {
                console.log(response)
                // ...
              },
        }, otpauth);
    
        let phone_number = e.target.phone.value;
        const appVerifier = window.recaptchaVerifier;
    
        signInWithPhoneNumber(otpauth,phone_number, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                console.log("otp sent");
                setViewOtpForm(true);
                window.confirmationResult = confirmationResult;
                // ...
            })
            .catch((error) => {
                // Error; SMS not sent
                // ...
                alert(error.message);
            });
    };
    const otpSubmit = (e) => {
        e.preventDefault();
    
        let opt_number = e.target.otp_value.value;
    
        window.confirmationResult
            .confirm(opt_number)
            .then((confirmationResult) => {
                console.log(confirmationResult);
                console.log("success");
                setVerify(true)
                
                

            
            })
            .catch((error) => {
                // User couldn't sign in (bad verification code?)
                alert(error.message);
            });
    };
    
    return(
        <div>
            
            
            Welcome {name}!
            
            <Link to="/form">Update student details</Link>
            {userArray.map((data => {

                if (data.Email === email )
                {
                    {console.log("Local"+localStorage.getItem("mobileVerified"))}
                if(data.IsMobileVerified || localStorage.getItem("mobileVerified") )
                {
                    
                    return(
                        <div>
                        <div>Name:{data.Name}</div>
                        <div>Email:{data.Email}</div>
                        <div>Mobile:{data.Mobile}<img src={tick}></img></div>
                        
                    
                        
                        </div>
                    )
                    
                }
                else
                {
                    return(
                <div>
                <div>Name:{data.Name}</div>
                <div>Email:{data.Email}</div>
                
                <p className="sub-text">Verify your mobile number.</p>
                <label id="recaptcha-container"></label>
                
                
                {verify?
                    
                    userArray.find(a => a.Name === data.Name).IsMobileVerified=true
                    
               
                
                :
                <Otp  verifyNo={verifyNo} otpSubmit={otpSubmit} viewOtpForm={viewOtpForm}/>
                
                }  
                {updateVerification()}
                
      
      
                
                 
                
                
                

            
                
                </div>
                    );
                
            }
        }
        
    }))}
            <button style={{"marginLeft" : "20px"}} 
            onClick={signOut} >
                Logout
            </button>
            
            
        </div>
);
}
  
export default Mainpage;