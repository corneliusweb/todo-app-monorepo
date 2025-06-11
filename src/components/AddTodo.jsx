import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const createTodo = async (newTodo) => {
	const res = await fetch('https://dummyjson.com/todos/add', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newTodo),
	});
	if (!res.ok) throw new Error('Failed to add todo');
	return res.json();
};

export default function AddTodo() {
	const [todoText, setTodoText] = useState('');
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	// useMutation for POST
	const mutation = useMutation({
		mutationFn: createTodo,
		onSuccess: () => {
			queryClient.invalidateQueries(['todos']);
			navigate('/'); // take us back to home
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!todoText.trim()) return;

		const newTodo = {
			todo: todoText,
			completed: false,
			userId: 1,
		};

		mutation.mutate(newTodo);
		setTodoText('');
	};

	return (
		<div>
			
		</div>
	);
}
