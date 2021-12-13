const express = require('express');
const mongooose = require('mongoose');
// cors will allow us to communicate withe the apis that we created
const cors = require('cors');
const app = express();

const TodoModel = require('./models/Todo');
// this parses the json that is coming form the client front end 
app.use(express.json());
app.use(cors());

mongooose.connect("mongodb+srv://user1:Wallclock92@react-crud.g41lh.mongodb.net/todo-list-app?retryWrites=true&w=majority", {
    useNewUrlParser: true,
})

app.post('/insert', async (req, res) => {
    const todoName = req.body.todoName;
    const todoDeadline = req.body.todoDeadline;
    const todo = new TodoModel({
        todoName: todoName,
        todoDeadline: todoDeadline
    })
    try {
        await todo.save();
        res.send("data added");
    } catch (error) {
        console.log(error);
    }
})

app.get('/read', async (req, res) => {
    TodoModel.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    })
})


app.put('/update', async (req, res) => {
    const updateTodo = req.body.updateTodo;
    const id = req.body.id;

    try {
        await TodoModel.findById(id, (err, updatedTodo) => {
            updatedTodo.todoName = updateTodo;
            updatedTodo.save();
            res.send("data updated");
        })
        
    } catch (err) {
        console.log(err);
    }
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await TodoModel.findByIdAndRemove(id).exec();


})

app.listen(8000, () => {
    console.log('Listening on port 8000');
});