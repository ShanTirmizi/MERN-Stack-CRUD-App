const mogoose = require('mongoose');

const TodoSchema = new mogoose.Schema({
    todoName: {
        type: String,
        required: true
    },
    todoDeadline: {
        type: Number,
        required: true
    }
})

const Todo = mogoose.model('Todo', TodoSchema);
module.exports = Todo;