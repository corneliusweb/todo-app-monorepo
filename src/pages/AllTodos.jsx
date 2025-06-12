import { useQuery } from '@tanstack/react-query';
import TodoList from '../components/todo/TodoList';

const fetchTodos = async () => {
	const res = await fetch('https://dummyjson.com/todos');
	if (!res.ok) {
		throw new Error('Failed to fetch todos');
	}
	return res.json();
};

const AllTodos = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['todos'],
		queryFn: fetchTodos,
	});

	if (isLoading) {
		return <div className="loading">Loading todos...</div>;
	}

	if (isError) {
		return <div className="error">Error: {error.message}</div>;
	}

	return (
		<div className="all-todos">
			<h1>My Todo List</h1>
			<TodoList todos={data.todos} />
		</div>
	);
};

export default AllTodos;
