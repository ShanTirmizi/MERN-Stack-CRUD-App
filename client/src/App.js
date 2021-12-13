import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [todoName, setTodoName] = useState("");
  const [todoDeadline, setTodoDeadline] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [updateTodo, setUpdateTodo] = useState("");

  const handleClick =() => {
    console.log("clicked", todoName, todoDeadline);
    Axios.post("http://localhost:8000/insert", {
      todoName: todoName,
      todoDeadline: todoDeadline
    });
    // setTodoName("");
    // setTodoDeadline(0);
  }
  const handleUpdate = (id) => {
    console.log("update", updateTodo);
    Axios.put("http://localhost:8000/update", {
      id: id,
      updateTodo: updateTodo
    });
    setUpdateTodo("");
  }

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:8000/delete/${id}`);
  }

  useEffect(() => {
    Axios.get("http://localhost:8000/read").then(res => {
      console.log(res.data);
      setTodoList(res.data);
    });
  },[])

  useEffect(() => {
    Axios.get("http://localhost:8000/read").then(res => {
      console.log(res.data);
      setTodoList(res.data);
    });
  },[todoList])


  return (
    <div className="App">
      <h1>Curb Mern App</h1>
      <input type="text" 
        onChange={(e) => {
          setTodoName(e.target.value);
        }} />
      <input type="number" 
        onChange={(e) => {
          setTodoDeadline(e.target.value);
        }}/>
      <button onClick={handleClick} >Add to List</button>
      {
        todoList.map((todo, key) => {
          // console.log("todo._id",todo._id);
          // console.log("key", key);
          return <div key={key}>
            <h3>{todo.todoName}</h3>
            <h3>{todo.todoDeadline}</h3>
            <input type="text" placeholder='Update'onChange={(e) => {
                setUpdateTodo(e.target.value);
              }} />
            <button onClick={() => handleUpdate(todo._id)}>Update</button>
            <button onClick={() => handleDelete(todo._id)}>Remove</button>
          </div>
        })
      }
    </div>
  );
}

export default App;
