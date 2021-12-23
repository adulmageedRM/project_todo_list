import React, {useState} from 'react';
import axios from 'axios';
import Todo from './components/Todo'
import './App.css';

export default function App() {
  
  const [tasks, setTasks]=useState([])

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
  const mapOverTasks=tasks.map((taskObj,i)=>(
   <Todo key={i} task={taskObj} />
  ));

  return (
    <div className="App">
     <p>app</p>
     <button onClick={getdata}>GET TASKS</button>

     {mapOverTasks}
    </div>
  );
}


