import React, {useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"

export default function Register(){
    const [email, setEmail]=useState('abd@hotmail.com')
    const [password, setPassword]=useState('111')
    const [username, setUsername]=useState('abd')
    const registerFunc = (e) => {
        e.preventDefault();
        console.log('reg')
        const newUser={
            email,password,username
        }
        axios
          .post('http://localhost:5000/users/Register',newUser)
          .then((res)=>{
              console.log("data: ",res.data)
          })
          .catch((err)=>{
              console.log("ERROR: ",err)
          })
    }

    return(
        <div className='Register'>
            <form action=''>
                <label htmlFor='email'>email</label>
                <input type='email' placeholder='Write email here ...'
                onChange={(e) => {
                    setEmail(e.target.value)
                }} value={email} ></input>
                <br></br>
                <label htmlFor='password'>password</label>
                <input type='password' placeholder='Write password here ...'
                onChange={(e) => {
                    setPassword(e.target.value)
                }} value={password} ></input>
                <br></br>
                <label htmlFor='username'>username</label>
                <input type='email' placeholder='Write username here ...'
                onChange={(e) => {
                    setUsername(e.target.value)
                }} value={username}></input>
                <br></br>
                <input type='submit' value='Register' onClick={registerFunc} ></input>
                <Link to="/Login">have an acount? </Link>
                
            </form>
        </div>
    )
}
