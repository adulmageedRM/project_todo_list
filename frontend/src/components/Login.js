import axios from 'axios';
import React,{useState} from 'react';
import { Link } from "react-router-dom"

export default function Login(props){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [logginMessage,setlogginMessage]=useState(0)
    const [loginStatus,setLoginStatus]=useState(null)
    
    
    

    const loginFunc =(e)=>{
        e.preventDefault();
        console.log('reg')
        const newUserLog = {email,password}
        axios.post('http://localhost:5000/users/Login', newUserLog)
          .then((response)=>{
            
           /*   props.setIsLoggedIn(true);
             props.setUsername(res.data.username); */
             setlogginMessage(response.data.message)
             setLoginStatus(response.status)
             console.log("data",response.data);
          })
          .catch((err) => {
            console.log("Error",err.response.data.message)
            //console.log("Error",err)
            setlogginMessage(err.response.data.message)
            setLoginStatus(err.response.status)
            props.setIsLoggedIn(false); 
            props.setUsername(null); 
          })
    }
   return(
       <div className='Login'>
         <form>
       <div className='p-3 mb-2 bg-secondary text-white'>
         <div className="mb-3">
           <div className='text-center'>
             <label htmlFor='exampleInputEmail1' className="form-label">Email :  </label>
             <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" type='email' placeholder='write email here ...'
              onChange={(e)=>{
                setEmail(e.target.value)
             }}
             value={email} />
            </div>
     {  /*       <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>  */ }
         </div>
         <div className="mb-3">
           <div className='text-center'> 
             <label htmlFor="exampleInputPassword1" className="form-label">Password : </label>
             <input type="password" className="form-control" placeholder='write password here ...' id="exampleInputPassword1" onChange={(e)=>{
                setPassword(e.target.value)
             }}
             value={password}/>
             </div>
         </div>
          <p>
         {loginStatus === 200 && (
             <div>{logginMessage}</div>
             )}
         {(loginStatus === 400 || loginStatus === 404 )&& (
             <div>{logginMessage}</div>
             )}
         </p>
           <div className='d-grid gap-2 col-6 mx-auto"'>
             
           
             <button type="submit" className="btn btn-primary" onClick={loginFunc}>Login</button>
            
            
             <Link to="/Register">Dont have an acount? </Link>
             
             
           </div>
           </div>
         </form>
            
        </div>

 /*
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
       </div> */ 
   )
}