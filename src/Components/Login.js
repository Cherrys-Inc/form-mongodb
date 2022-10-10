import React,{useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

import {auth,provider,fprovider} from "../firebase"
import { getAuth, signInWithPopup, GoogleAuthProvider ,FacebookAuthProvider} from "firebase/auth";
import { login } from '../features/userSlice';
import { useDispatch } from 'react-redux';

import "./Login.css";
export default function Login(){
    
    const navigate= useNavigate();
    const dispatch = useDispatch();
    
    
    
   function googleSignin(){
    return(
        
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                localStorage.setItem("user", JSON.stringify({name:user.displayName,
                email:user.email,
                uid:user.uid,
                
            }))
                

                navigate("/profile")

               
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            })

    );
   }
   function fbSignin(){
    return(
        
        signInWithPopup(auth, fprovider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                localStorage.setItem("user", JSON.stringify({name:user.displayName,
                email:user.email,
                uid:user.uid,
                
            }))
                

                navigate("/profile")

               
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
                // ...
            })

    );
   }




      
    return (
        <div className="buttons-body">
    
                <center>
                <div>
                <button className="loginBtn loginBtn--google" onClick={googleSignin}>
                Login with google
                </button>
                </div>
                <div>
                <button class="loginBtn loginBtn--facebook" onClick={fbSignin}>
                Login with Facebook
                </button>
                </div>
                </center>
                
                
            
        </div>
    );
}
  
