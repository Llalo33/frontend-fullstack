import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodo, deleteTodo } from '../features/todoSlice';
import { NavLink } from "react-router-dom";

const Todo = () => {
  const todos = useSelector((state) => state.todo.todos)
  const token = useSelector((state) => state.application.token)

  const dispatch = useDispatch();

  const [body, setBody] = useState('')

  const handleBody = (e) => {
    setBody(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchTodo())
  }, [dispatch])

  const handleDelete = (_id) => {
    dispatch(deleteTodo(_id));
  };

  const handleAddTodo = (name) => {
    dispatch(addTodo(name));
  };

  

  return (
    <div>
      <input type="text" value={body} onChange={handleBody} />
      <button onClick={() => handleAddTodo(body)}>Добавить</button>
      <ol>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.name}
            <button onClick={() => handleDelete(todo._id)}>Удалить</button>
          </li>
        ))}
      </ol>
      <NavLink to={'/'}><button>Вернуться в users</button></NavLink>
      <NavLink to={'/login'}><button>Вернуться в login</button></NavLink>
    </div>
  );
};

export default Todo;
