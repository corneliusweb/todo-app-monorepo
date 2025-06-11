import { useQuery } from '@tanstack/react-query';

const fetchTodos = async () => {
	const res = await fetch('https://dummyjson.com/todos');
	if (!res.ok) {
		throw new Error('Something went wrong trying to fetch todos');
	}
	return res.json();
};

export default function AllTodos() {
	const { data } = useQuery({
		queryKey: ['todos'],
		queryFn: fetchTodos,
	});

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
