import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Todo from './components/Todo'
import Add from './components/Add'
import Register from './components/Register'
import './App.css';

export default function App() {
  
  const [tasks, setTasks]=useState([])

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

 /* const mapOverTasks=tasks.map((taskObj,i)=>(
   <Todo key={taskObj._id}
    task={taskObj}
    deleteTodo={deleteTodo}
    toggleTodo={toggleTodo} />
  )); */

  return (
    <div className="App">
     <p>app</p>
 {/*   <Add createFunc={postNewTodo} /> */}
     <button onClick={getdata}>GET TASKS</button>

     <button onClick={deleteTasks}>DELETE completed tasks</button>
     <button onClick={()=>{
       filterData(true)
     }} >GET DONE</button>

     <button onClick={()=>{
       filterData(false)
     }} >GET PENDING</button>

     <Register />
     
{/*    {mapOverTasks}  */}
    </div>
  );
}


