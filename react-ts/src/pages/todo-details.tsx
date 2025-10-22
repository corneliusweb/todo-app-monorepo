import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

const fetchTodo = async (id: string | undefined) => {
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
		return <div className='state-style'>Loading todo details...</div>;
	}

	if (isError) {
		return (
			<div className='state-style text-red-500'>Error: {error.message}</div>
		);
	}

	return (
		<div className='max-w-fit mx-auto flex flex-col my-10'>
			<Link to='/todos' className='back-link'>
				<IoChevronBack /> Back to Todos
			</Link>
			<div className='bg-white rounded-lg p-6 w-96 max-w-[95vw] shadow-md sm:min-w-lg'>
				<h1 className='mb-5 text-gray-800 text-3xl'>{data.todo}</h1>
				<div className='flex flex-col'>
					<span
						className={`inline-block py-1 px-2 mb-2 rounded-sm text-base ${
							data.completed
								? 'bg-completed-light text-completed'
								: 'bg-pending-light text-pending'
						}`}
					>
						{data.completed ? 'Completed' : 'Pending'}
					</span>
					<p className='m-0 text-base text-gray-500'>Todo ID: {data.id}</p>
					<p className='m-0 text-base text-gray-500'>
						User ID: {data.userId}
					</p>
				</div>
			</div>
		</div>
	);
};

export default TodoDetails;
