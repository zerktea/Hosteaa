import React from "react"
import '../index.css'
import EyePass from "./Eyepass";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import '../Styles/Form.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Form(props){
    const navigate = useNavigate();
    const [isPass,setPass]=React.useState("password")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [form,setForm] =
    React.useState({
      name:"",
      surename:"",
      email:"",
      password:"",
      confirmpassword:"",
      newletter: false
    })
    const [ferror,setError] =
    React.useState({
      name:"",
      surename:"",
      email:"",
      password:"",
      confirmpassword:""
    }
    )
    const goLogin = () => {
        
        navigate(`/Login`);
      
      }
    function handleForm(event){
       event.target.type==="checkbox"? setForm({
        ...form,
        newletter: !form.newletter
    }):
       setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        
    }
    function handleClick(){
       isPass==="password"?setPass("text"):setPass("password")
    }

   async function handleSubmit(event){
       
        event.preventDefault();
        if(!form.name){
            setError({
                ...ferror,
                name:"Name is required"
            })
            
        }else{
            setError({
                ...ferror,
                name:""
            })
        }
        if(!form.surename){
            setError({
                ...ferror,
                surename:"Surename is required"
            })
            
        }else{
            setError({
                ...ferror,
                surename:""
            })
        }
        if(!form.email){
            setError({
                ...ferror,
                email:"Email is required"
            })
            
        }else{
            setError({
                ...ferror,
                email:""
            })
        }
       
        if(!form.password){
            setError({
                ...ferror,
                password:"Password is required"
            })
            
        }
        else if(!form.confirmpassword){
            setError({
                ...ferror,
                confirmpassword:"Confirm password is required"
            })
            
        }
        else if(form.password !== form.confirmpassword){
            setError({
                ...ferror,
                confirmpassword:"Passwords do not match"
            })
        }else{
            setError({
                ...ferror,
                confirmpassword:"",
                password:""
            })
        }
  
       if(form.password === form.confirmpassword && !ferror.name && !ferror.surename && !ferror.email && !ferror.password && !ferror.confirmpassword ){
            try {
                // Send a POST request to the Express server
                const response = await axios.post('http://localhost:5000/api/newUser', {
                name:form.name,
                surename:form.surename,
                email:form.email,
                password:form.password,
                newletter:form.newletter,  
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                   
                }
                );
                toast.success('Successfully registered', {
                    position: "top-right",
                    autoClose: 1200,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
             // Log the server response
                navigate('/Login');
              } catch (error) {
                if(error.response.status === 400){
                    setError({
                        ...ferror,
                        email:"Email already in use or wrong format"
                    })
                }
                else{
                    
                }
                return
              }
              
            //alert("Wlecom to the jungle " + form.name)
            

            return
        }
        
        
        return
    }

    return(
        <div className="form--div App">
            <div className="form--header">
            
            <h2>Sign in </h2>
            <p>Already have an acount ?<a onClick={() => {
            goLogin();}}> login</a></p>
            
            <h4>Please Enter your details so sign in</h4>
            </div>
        <form action="" className="form" onSubmit={handleSubmit}>
            {/* <label htmlFor="name"  >Name</label> */}
            <input 
                type="text"
                name="name" 
                placeholder="Name" 
                value={form.name} 
                onChange={handleForm}
            />
            <span style={{ color: 'red' }}>{ferror.name}</span>
            
            <input 
                type="text" 
                name="surename"
                placeholder="Surename"
                value={form.surename} 
                onChange={handleForm}
            />
            <span style={{ color: 'red' }}>{ferror.surename}</span>

            <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Email"
                value={form.email} 
                onChange={handleForm}
            />
            <span style={{ color: 'red' }}>{ferror.email}</span>
            <div className="pass">
                <input 
                    type={isPass} 
                    name="password" 
                    id="password" 
                    placeholder="Password" 
                    value={form.password} 
                    onChange={handleForm}
                />
                <EyePass
                    value={isPass}
                    handleClick={handleClick}
                /> 
                <span style={{ color: 'red' }}>{ferror.password}</span>
            </div>

            <input 
                type="password"
                name="confirmpassword" 
                placeholder="Repeat password" 
                value={form.confirmpassword} 
                onChange={handleForm}
            />
            <span style={{ color: 'red' }}>{ferror.confirmpassword}</span>
            <select name="gender" value={form.gender} onChange={handleForm}>
                <option value="">Grapefruit</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <div className="checkbox">
                <input 
                    type="checkbox" 
                    name="newletter"
                    onChange={handleForm} 
                    checked={form.newletter} 
                />
                
                <label htmlFor="newspaper"> Sub to our Newsletter</label>
            </div>
            

            <button className="form--submit">Sign In</button>
        </form>
        <ToastContainer
            position="top-right"
            autoClose={1200}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
/>
        </div>
    )
}