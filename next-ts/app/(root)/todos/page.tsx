'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import type { ITodo } from '@/app/types';
import TodoList from '@/components/todo/TodoList';

const fetchTodos = async () => {
	const res = await fetch('https://dummyjson.com/todos');
	if (!res.ok) {
		throw new Error('Failed to fetch todos');
	}
	const data = await res.json();
	return data;
};

const ITEMS_PER_PAGE = 10;

const FILTER_OPTIONS = {
	ALL: 'all',
	COMPLETED: 'completed',
	INCOMPLETE: 'incomplete',
};

const Todos = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState(FILTER_OPTIONS.ALL);

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['todos'],
		queryFn: fetchTodos,
	});

	// Always call hooks before any return
	const filteredTodos = useMemo(() => {
		if (!data || !data.todos) return [];
		return data.todos.filter((todo: ITodo) => {
			const matchesSearch = todo.todo
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
			const matchesFilter =
				statusFilter === FILTER_OPTIONS.ALL ||
				(statusFilter === FILTER_OPTIONS.COMPLETED && todo.completed) ||
				(statusFilter === FILTER_OPTIONS.INCOMPLETE && !todo.completed);
			return matchesSearch && matchesFilter;
		});
	}, [data, searchQuery, statusFilter]);

	const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const currentTodos = filteredTodos.slice(startIndex, endIndex);

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1); // Reset to first page when search
	};

	const handleFilterChange = (filter: string) => {
		setStatusFilter(filter);
		setCurrentPage(1); // Reset to first page when filter change
	};

	if (isLoading) {
		return <div className='loading'>Loading todos...</div>;
	}

	if (isError) {
		return <div className='error'>Error: {error.message}</div>;
	}

	if (!data || !data.todos) {
		return <div className='error'>No data available</div>;
	}

	return (
		<div className='max-w-2xl mx-auto mt-20'>
			<h1 className='font-bold text-2xl'>My Todos</h1>
			<div className='my-5 p-5 bg-white rounded-lg shadow-md'>
				<div className='mb-4'>
					<input
						type='text'
						placeholder='Search todos...'
						value={searchQuery}
						onChange={handleSearch}
						className='search-input'
					/>
				</div>

				<div className='flex gap-2.5'>
					<button
						className={`filter-btn ${
							statusFilter === FILTER_OPTIONS.ALL ? 'active' : ''
						}`}
						onClick={() => handleFilterChange(FILTER_OPTIONS.ALL)}
					>
						All
					</button>
					<button
						className={`filter-btn ${
							statusFilter === FILTER_OPTIONS.COMPLETED ? 'active' : ''
						}`}
						onClick={() => handleFilterChange(FILTER_OPTIONS.COMPLETED)}
					>
						Completed
					</button>
					<button
						className={`filter-btn ${
							statusFilter === FILTER_OPTIONS.INCOMPLETE ? 'active' : ''
						}`}
						onClick={() => handleFilterChange(FILTER_OPTIONS.INCOMPLETE)}
					>
						Incomplete
					</button>
				</div>
			</div>

			<TodoList todos={currentTodos} />

			{filteredTodos.length === 0 ? (
				<div className='no-results'>
					No todos found matching your search query
				</div>
			) : (
				<div className='pagination'>
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className='pagination-button'
					>
						Previous
					</button>

					<span className='text-lg text-gray-600'>
						Page {currentPage} of {totalPages}
					</span>

					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className='pagination-button'
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
};
export default Todos;
