const express = require('express');
const port = 8000;
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname,'public')));

let task = [
    {
        id : 1,
        task : "HTML",
        status : "default" 
    },
    {
        id : 2,
        task : "CSS",
        status : "default"
    }
]

app.use(express.urlencoded());

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    return res.render('todo',{task})
})

app.get('/add', (req, res) => {
    return res.render('add', { task });
});

app.post('/add', (req, res) => {
    let newTask = req.body.taskName;
    let status = req.body.taskStatus;

    if (!newTask || !status) {
        console.log("Not Valid");
        return res.redirect('/add');
    }

    let obj = {
        id: Math.floor(Math.random() * 100000),
        task: newTask,
        status
    };

    task.push(obj);
    console.log("Task successfully added");
    return res.redirect('/');
});

app.get('/editTask',(req,res)=>{
    let id = req.query.id;
    let single =task.find(item => item.id == id )
    return res.render('edit',{single}); 
})

app.post('/editTodo',(req,res)=>{
   let up = task.map((val)=>{
        if(val.id == req.body.editId){
            val.task = req.body.task;
            val.status = req.body.status;
        }
        return val;
   })

   task = up;
   return res.redirect('/');
   
})

app.get('/deleteData',(req,res)=>{
    let deleteId = req.query.deleteId;
    let deletetask = task.filter((val)=>{ 
        return val.id != deleteId;
    })
    task = deletetask;
    return res.redirect('/');
 })

app.listen(port,(err)=>{
    if(err){
        console.log("server is not start");
        return false;
    }
    console.log("server is  start on port :- "+port);

})