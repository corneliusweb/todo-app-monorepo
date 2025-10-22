import { ITodo } from '@/app/types';
import Link from 'next/link';

const TodoItem = ({ todo }: { todo: ITodo }) => {
	return (
		<div className='bg-gray-200 rounded-lg p-3.5 mt-2.5 shadow-md'>
			<Link href={`/todos/${todo.id}`}>
				<h3 className='mb-2.5 text-lg font-semibold'>{todo.todo}</h3>
			</Link>
			<span
				className={`inline-block py-1 px-2 rounded-sm text-base ${
					todo.completed
						? 'bg-completed-light text-completed'
						: 'bg-pending-light text-pending'
				}`}
			>
				{todo.completed ? 'Completed' : 'Pending'}
			</span>
		</div>
	);
};

export default TodoItem;
