import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createTodo = async (newTodo) => {
  const res = await fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodo),
  });
  if (!res.ok) throw new Error('Failed to add todo');
  return res.json();
};

const AddTodoForm = ({ onSuccess }) => {
  const [todoText, setTodoText] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      if (onSuccess) onSuccess();
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
    <div style={{ minWidth: 300 }}>
      <h2>Add New Todo</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder="Enter todo"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #d9d9d9' }}
        />
        <button
          type="submit"
          disabled={mutation.isPending || !todoText.trim()}
          style={{
            padding: '8px 16px',
            borderRadius: 4,
            background: '#10B981',
            color: 'white',
            border: 'none',
            cursor: mutation.isPending ? 'not-allowed' : 'pointer',
          }}
        >
          {mutation.isPending ? 'Adding...' : 'Add'}
        </button>
      </form>
      {mutation.isError && (
        <p style={{ color: '#ff4d4f', marginTop: 16 }}>Error: {mutation.error.message}</p>
      )}
    </div>
  );
};

export default AddTodoForm;
