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

