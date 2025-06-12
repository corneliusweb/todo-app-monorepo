import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import TodoList from '../components/todo/TodoList';

const fetchTodos = async () => {
	const res = await fetch('https://dummyjson.com/todos');
	if (!res.ok) {
		throw new Error('Failed to fetch todos');
	}
	return res.json();
};

const ITEMS_PER_PAGE = 10;

const AllTodos = () => {
	const [currentPage, setCurrentPage] = useState(1);
	
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['todos'],
		queryFn: fetchTodos,
	});

	if (isLoading) {
		return <div className="loading">Loading todos...</div>;
	}

	if (isError) {
		return <div className="error">Error: {error.message}</div>;
	}

	// Calculate pagination
	const totalPages = Math.ceil(data.todos.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const currentTodos = data.todos.slice(startIndex, endIndex);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className="all-todos">
			<h1>My Todo List</h1>
			<TodoList todos={currentTodos} />
			
			<div className="pagination">
				<button 
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="pagination-button"
				>
					Previous
				</button>
				
				<span className="page-info">
					Page {currentPage} of {totalPages}
				</span>
				
				<button 
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="pagination-button"
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default AllTodos;
