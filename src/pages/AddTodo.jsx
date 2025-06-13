import { useState, useEffect } from 'react';
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
	const [showSuccess, setShowSuccess] = useState(false);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	// useMutation for POST
	const mutation = useMutation({
		mutationFn: createTodo,
		onSuccess: () => {
			queryClient.invalidateQueries(['todos']);
			setShowSuccess(true);
		},
	});

	useEffect(() => {
		if (showSuccess) {
			const timer = setTimeout(() => {
				navigate('/todos');
			}, 1500);
			return () => clearTimeout(timer);
		}
	}, [showSuccess, navigate]);

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
		<div style={{ maxWidth: 400, margin: '40px auto', padding: 20, background: 'white', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
			<h1>Add New Todo</h1>
			<form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
				<input
					type="text"
					placeholder="Enter todo"
					value={todoText}
					onChange={(e) => setTodoText(e.target.value)}
					style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #d9d9d9' }}
				/>
				<button type="submit" disabled={mutation.isPending || !todoText.trim()} style={{ padding: '8px 16px', borderRadius: 4, background: '#1677ff', color: 'white', border: 'none', cursor: mutation.isPending ? 'not-allowed' : 'pointer' }}>
					{mutation.isPending ? 'Adding...' : 'Add'}
				</button>
			</form>

			{mutation.isError && <p style={{ color: '#ff4d4f', marginTop: 16 }}>Error: {mutation.error.message}</p>}
			{showSuccess && <p style={{ color: '#52c41a', marginTop: 16 }}>Todo added successfully! Redirecting...</p>}
		</div>
	);
}
