import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Todo from './components/Todo'
import Add from './components/Add'
import { Routes, Route, Link } from "react-router-dom"
import Register from './components/Register'
import Login from './components/Login'
import './App.css';

export default function App() {
  
  const [tasks, setTasks]=useState([])

  const [isLoggedIn, setIsLoggedIn]=useState(false)
  const [username, setUsername]=useState("")

useEffect(()=>{
  getdata()
},[])

  const getdata=()=>{
    axios
     .get("http://localhost:5000/tasks")
     .then((res)=>{
       console.log("DATA",res.data);
       setTasks(res.data);
     })
     .catch((err)=>{
       console.log("ERROR",err);
     });
  };

  const filterData=(status)=>{
    axios
     .get(`http://localhost:5000/filter?isCompleted=${status}`)
     .then((res)=>{
       console.log("DATA",res.data);
       setTasks(res.data);
     })
     .catch((err)=>{
       console.log("ERROR",err);
     });
  };
  

  const postNewTodo=(body)=>{
    axios
     .post("http://localhost:5000/tasks",body)
     .then((res)=>{
       console.log("DATA",res.data);
       getdata()
       //setTasks(res.data);
     })
     .catch((err)=>{
       console.log("ERROR",err);
     });
  };

  const deleteTodo=(id)=>{
    axios
     .delete(`http://localhost:5000/tasks/${id}`)
     .then((res)=>{
       console.log("DATA",res.data);
       getdata()
       //setTasks(res.data);
     })
     .catch((err)=>{
       console.log("ERROR",err);
     });
  };

  const deleteTasks=()=>{
    axios
     .delete(`http://localhost:5000/tasks`)
     .then((res)=>{
       console.log("DATA",res.data);
       getdata()
       //setTasks(res.data);
     })
     .catch((err)=>{
       console.log("ERROR",err);
     });
  };

  const toggleTodo=(id,newStatus)=>{
    axios
     .put(`http://localhost:5000/tasks/${id}/${newStatus}`)
     .then((res)=>{
       console.log("DATA",res.data);
       getdata()
       //setTasks(res.data);
     })
     .catch((err)=>{
       console.log("ERROR",err);
     });
  };

  const logOutFun = () => {
    setIsLoggedIn(false)
    setUsername("")
  }

 /* const mapOverTasks=tasks.map((taskObj,i)=>(
   <Todo key={taskObj._id}
    task={taskObj}
    deleteTodo={deleteTodo}
    toggleTodo={toggleTodo} />
  )); */

  return (
    <div className="App">
       <div>
       <nav>
           <br/>
           <Link to='/home' >Home</Link>
           <br/>
           
         </nav>
        </div>
        
       <Routes>
         <Route path="/home" element={<div className='Home'>
     <p>Welcome to todo list</p>
     <Link to='/Register' >Register</Link> {' || '}
     <Link to='/Login' >Login</Link>
     <p>{username} </p>
 {/*   <Add createFunc={postNewTodo} /> */}
     <button onClick={getdata}>GET TASKS</button>
     <br/>
     <button onClick={deleteTasks}>DELETE completed tasks</button>
     <br/>
     <button onClick={()=>{
       filterData(true)
     }} >GET DONE</button>

     <button onClick={()=>{
       filterData(false)
     }} >GET PENDING</button>
     <br/>
     <button onClick={logOutFun} >Logout</button>
     </div>} />  
         <Route path="/Register" element={<Register />}/> 
         <Route path="/Login" element={<Login
         setIsLoggedIn={setIsLoggedIn}
         setUsername={setUsername} />} />
      </Routes>
      

      
  {/**  <Register />   */}

 {/**  <Login />  */}
     
{/*    {mapOverTasks}  */}
    </div>
  );
}


