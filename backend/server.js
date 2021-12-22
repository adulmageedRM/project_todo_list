const express=require('express');
const app=express()
app.use(express.json())

const db=require('./db');
const Todo=require('./todo');

// console.log(Todo)


app.get('/',(req,res)=>{
    res.json('GET / is working')
});


app.get('/tasks',(req,res)=>{
    Todo.find({},(err,data)=>{
        if(err){
            console.log('ERROR',err)
        }else{
            res.json(data)
        }
    });
});


app.post('/tasks',(req,res)=>{
    Todo.create(req.body,(err,newTask)=>{
        console.log('25',req.body)
        if(err){
            console.log('ERROR',err)
        }else{
           res.status(201).json(newTask)
        }
    });
});




app.listen(5000,()=>{
    console.log('SERVER is working')
});

