const express=require('express');
const cors=require("cors");
const app=express();
app.use(express.json());
app.use(cors());

const db=require('./db');
const Todo=require('./todo');
const Users=require('./users');


// console.log(Todo)
//console.log(Users)


app.post("/users/Register",(req,res)=>{
    Users.create(req.body,(err,newUser)=>{
        if (err) {
         res.status(400).json({message:'this email already taken'});
        } else {
         res.status(201).json({message:'Create New User Seccessfully'})
        }
    });
});

app.post("/users/Login",(req,res) => {
    Users.find({email: req.body.email},(err,arrUserfound) => {
        if(err) {
            res.json("ERROR", err)
         }else{
            if(arrUserfound.length === 1){
             if(req.body.password === arrUserfound[0].password){
                    res.status(200).json({
                     message:"login successfully",
                     username: arrUserfound[0].username
                    });
            } else {
                res.status(400).json({
                message:"Wrong password",
                 });
            }
          } else {
              res.status(404).json({
                  message:"The email entred is not registered"
              });
            }
          }
    });
});


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

app.delete('/tasks',(req,res)=>{
    Todo.deleteMany({isCompleted: true },(err,deleteObj)=>{
        if(err){
            console.log('EROOR',err)
        }else{
            deleteObj.deletedCount === 0
            ? res.status(404).json("there is no completed todo found")
            : res.json("delete all completed todos successfully");
        }
    });
});

app.put('/tasks/:id',(req,res)=>{
    console.log('10',req.params)

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

app.put('/tasks/:id/:isCompleted',(req,res)=>{
    console.log('1234',req.params)

   Todo.updateOne({_id :req.params.id},
    {isCompleted: req.params.isCompleted},
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

