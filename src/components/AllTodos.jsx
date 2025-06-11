import { useQuery } from '@tanstack/react-query';

const fetchTodos = async () => {
	const res = await fetch('https://dummyjson.com/todos');
	if (!res.ok) {
		throw new Error('Something went wrong trying to fetch todos');
	}
	return res.json();
};

export default function AllTodos() {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['todos'],
		queryFn: fetchTodos,
	});

	// check loading state before displaying error
	if (isLoading) return <p>Loading todos...</p>;

	if (isError) return <p>Error: {error.message}</p>;

	return (
		<div>
			<h1>All Todos</h1>
			<ul>
				{data.todos.map((todo) => (
					<li key={todo.id}>
						{todo.todo} {todo.completed ? '✅' : '❌'}
					</li>
				))}
			</ul>
		</div>
	);
}
