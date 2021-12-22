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


app.get('/filter',(req,res)=>{
    console.log(req.query)
    Todo.find({isCompleted: req.query.isCompleted},(err,data)=>{
        if(err){
            console.log("ERROR",err)
       }else{
           res.json(data)
       }
    })
})

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

app.delete('/tasks/:id',(req,res)=>{
    console.log('30',req.params.id)

    Todo.deleteOne({_id :req.params.id},(err,deleteObj)=>{
        if(err){
            console.log('ERROR',err)
        }else{
            deleteObj.deletedCount === 1
          ? res.json("delete one todo successfully") 
          : res.status(404).json("this todo is not found")
        }
    });
});

app.put('/tasks/:id',(req,res)=>{
    console.log('10',req.params.id)

   Todo.updateOne({_id :req.params.id},{title: req.body.newTitle},
    (err,updateObj)=>{
        if(err){
            console.log("ERROR",err)
            res.status(400).json(err)
        }else{
            console.log(updateObj)
            updateObj.modifiedCount === 1
          ? res.json("Ubdate one todo successfully") 
          : res.status(404).json("this todo is not found")
        }
    });
});




app.listen(5000,()=>{
    console.log('SERVER is working')
});

