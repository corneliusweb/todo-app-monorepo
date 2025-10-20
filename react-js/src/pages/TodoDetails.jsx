import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

const fetchTodo = async (id) => {
  const res = await fetch(`https://dummyjson.com/todos/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch todo');
  }
  return res.json();
};

const TodoDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => fetchTodo(id),
  });

  if (isLoading) {
    return <div className="loading">Loading todo details...</div>;
  }

  if (isError) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="todo-details">
      <Link to="/todos" className="back-link">
        <IoChevronBack /> Back to Todos
      </Link>
      <div className="todo-card">
        <h1>{data.todo}</h1>
        <div className="todo-info">
          <span className={`status ${data.completed ? 'completed' : 'pending'}`}>
            {data.completed ? 'Completed' : 'Pending'}
          </span>
          <p className="todo-id">Todo ID: {data.id}</p>
          <p className="user-id">User ID: {data.userId}</p>
        </div>
      </div>
    </div>
  );
};

export default TodoDetails;
