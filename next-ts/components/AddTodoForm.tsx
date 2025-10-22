'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ITodo } from '@/app/types';

const createTodo = async (newTodo: ITodo) => {
	const res = await fetch('https://dummyjson.com/todos/add', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newTodo),
	});
	if (!res.ok) throw new Error('Failed to add todo');
	return res.json();
};

const AddTodoForm = ({ onSuccess }: { onSuccess: () => void }) => {
	const [todoText, setTodoText] = useState('');
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: createTodo,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
			if (onSuccess) onSuccess();
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!todoText.trim()) return;
		const newTodo = {
			todo: todoText,
			completed: false,
			userId: Math.floor(Math.random() * 100) + 100,
			id: Math.floor(Math.random() * 100) + 1,
		};
		mutation.mutate(newTodo);
		setTodoText('');
	};

	return (
		<div>
			<h2>Add New Todo</h2>
			<form onSubmit={handleSubmit} className='grid gap-4 mt-9'>
				<input
					type='text'
					placeholder='Enter todo'
					value={todoText}
					onChange={(e) => setTodoText(e.target.value)}
					className='p-2 rounded-sm border border-gray-300 block w-full'
				/>
				<button
					type='submit'
					disabled={mutation.isPending || !todoText.trim()}
					className={`py-2 px-4 rounded-sm w-full text-white bg-page-green ${
						mutation.isPending ? 'cursor-not-allowed' : 'cursor-pointer'
					}`}
				>
					{mutation.isPending ? 'Adding todo...' : 'Add'}
				</button>
			</form>
			{mutation.isError && (
				<p className='mt-4 text-red-500'>Error: {mutation.error.message}</p>
			)}
		</div>
	);
};

export default AddTodoForm;
