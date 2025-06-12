import React from 'react';
import { Link } from 'react-router-dom';

const TodoItem = ({ todo }) => {
  return (
    <div className="todo-item">
      <Link to={`/todos/${todo.id}`}>
        <h3>{todo.title}</h3>
      </Link>
      <p>{todo.description}</p>
      <span className={`status ${todo.completed ? 'completed' : 'pending'}`}>
        {todo.completed ? 'Completed' : 'Pending'}
      </span>
    </div>
  );
};

export default TodoItem; 