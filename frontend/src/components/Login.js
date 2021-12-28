import axios from 'axios';
import React,{useState} from 'react';
import { Link } from "react-router-dom"

export default function Login(props){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const loginFunc =(e)=>{
        e.preventDefault();
        console.log('reg')
        const newUserLog={email,password}
        axios.post('http://localhost:5000/users/Login',newUserLog)
          .then((res)=>{
             console.log("data",res.data);
             props.setIsLoggedIn(true);
             props.setUsername(res.data.username);
          })
          .catch((err)=>{
            console.log("Error",err)
          })
    }
   return(
       <div className='Login'>
           <form action=''>
             <label htmlFor=''>Email: </label>
             <input type='email' placeholder='write email here ...'
              onChange={(e)=>{
                setEmail(e.target.value)
             }}
             value={email} />
             <br />
             <label htmlFor=''>Password: </label>
             <input type='password'  placeholder='write password here ...'
             onChange={(e)=>{
                setPassword(e.target.value)
             }}
             value={password}/>
             <br />
             <input type='submit' value='Login' onClick={loginFunc}/>
             <Link to="/Register">Dont have an acount? </Link>
           </form>
       </div>
   )
}