import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const fetchTodoById = async (id) => {
	const res = await fetch(`https://dummyjson.com/todos/${id}`);
	if (!res.ok) {
		throw new Error('Failed to fetch todo details');
	}
	return res.json();
};

export default function TodoDetails() {
	const { id } = useParams(); // I will have the instructor from LMS to thank for this one😂
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['todo', id],
		queryFn: () => fetchTodoById(id),
	});

	if (isLoading) return <p>Loading todo details...</p>;

	if (isError) return <p>Error: {error.message}</p>;

	return (
		console.log(<div>
			<h1>Todo Details</h1>
			<p>
				<strong>Todo ID:</strong> {data.id}
			</p>
			<p>
				<strong>Task:</strong> {data.todo}
			</p>
			<p>
				<strong>Status:</strong>{' '}
				{data.completed ? 'Completed ✅' : 'Not completed ❌'}
			</p>
		</div>)
	);
}
