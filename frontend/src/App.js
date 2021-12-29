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

  const mapOverTasks=tasks.map((taskObj,i)=>(
   <Todo key={taskObj._id}
    task={taskObj}
    deleteTodo={deleteTodo}
    toggleTodo={toggleTodo} />
  )); 

  return (
    <div className="App">
       <div>
         <nav>
           <br/>
           <Link to='/home' >home</Link>
           <br/>
           
         </nav>
       </div>
        
     <Routes>
       <Route path="/home" element={
        <div className='Home'>
         <span>Welcome to todo list</span>
         <br/>
         <Link to='/Register' > Register</Link> {' || '}
         <Link to='/Login' > login</Link>
         <p>{username} </p>
         <Add createFunc={postNewTodo} /> 
         <button onClick={getdata}>get tasks</button>
         <br/>
         <button onClick={deleteTasks}>delete completed tasks</button>
         <br/>
         <button onClick={()=>{
           filterData(true)
          }} >completed tasks</button>

         <button onClick={()=>{
           filterData(false)
          }} > pending done </button>
         <br/>
         <button onClick={logOutFun} > log out </button>
         {mapOverTasks}
        </div>} />  
       <Route path="/Register" element={<Register />}/> 
       <Route path="/Login" element={<Login
         setIsLoggedIn={setIsLoggedIn}
         setUsername={setUsername} />} />
     </Routes>

  </div>
  );
}


