
import React, { useState } from 'react';
import '../index.css'
import { useDispatch } from 'react-redux';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { getUser, loginUser } from '../slice/userSlice';
export default function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goSignUp = () => {
        
        navigate(`/Form`);
        
    }
    const [loginError, setLoginError] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
        try {
             
            const response = await axios.post('http://localhost:5000/api/login', {
            email ,
            password ,
          },
          {
              headers: { 'Content-Type': 'application/json' },
             
          }
          );
    
          const { token } = response.data;
        
          // Store the token in localStorage or a state management solution
          localStorage.setItem('token', token);
          console.log('Login successful');
          dispatch(getUser());
          navigate('/');

        } catch (error) {
          setLoginError(error.response.data.message);
          console.error('Login failed:', error.response ? error.response.data.message : error.message);
        }
    };
    
    return(
        <div className="form--div App">
            <div className="form--header">
            
            <h2>Log in</h2>
            <p>Dont have an acount ? <a onClick={() => {
            goSignUp();
          }}>Join us</a></p>
            
            <h4>Please Enter your details to Login</h4>
            </div>
        <form className="form" >
            {/* <label htmlFor="name"  >Name</label> */}
            <span className="form--error" style={{ color: 'red' }}>{loginError}</span>
            <input type="text" placeholder="email" value={email}
            onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            <button type="button" className="form--submit" onClick={handleLogin} >LogIn</button>
        </form>
        </div>
    )
};