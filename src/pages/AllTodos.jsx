import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import TodoList from '../components/todo/TodoList';
import Modal from '../components/Modal';
import AddTodoForm from '../components/AddTodoForm';
import SuccessModal from '../components/SuccessModal';

const fetchTodos = async () => {
	console.log('Fetching todos...');
	const res = await fetch('https://dummyjson.com/todos');
	if (!res.ok) {
		throw new Error('Failed to fetch todos');
	}
	const data = await res.json();
	console.log('Fetched todos:', data);
	return data;
};

const ITEMS_PER_PAGE = 10;

const FILTER_OPTIONS = {
	ALL: 'all',
	COMPLETED: 'completed',
	INCOMPLETE: 'incomplete'
};

const AllTodos = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState(FILTER_OPTIONS.ALL);
	const [showModal, setShowModal] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['todos'],
		queryFn: fetchTodos,
	});

	console.log('Query state:', { data, isLoading, isError, error });

	// Always call hooks before any return
	const filteredTodos = useMemo(() => {
		if (!data || !data.todos) return [];
		return data.todos.filter(todo => {
			const matchesSearch = todo.todo.toLowerCase().includes(searchQuery.toLowerCase());
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

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1); // Reset to first page when search
	};

	const handleFilterChange = (filter) => {
		setStatusFilter(filter);
		setCurrentPage(1); // Reset to first page when filter change
	};

	const handleAddSuccess = () => {
		setShowModal(false);
		setShowSuccess(true);
		setTimeout(() => setShowSuccess(false), 2000);
	};

	if (isLoading) {
		return <div className="loading">Loading todos...</div>;
	}

	if (isError) {
		return <div className="error">Error: {error.message}</div>;
	}

	if (!data || !data.todos) {
		return <div className="error">No data available</div>;
	}

	return (
		<div className="all-todos">
			<h1>My Todo List</h1>
			<button
				className="nav-link"
				style={{ marginBottom: 16, background: '#52c41a', border: 'none', cursor: 'pointer' }}
				onClick={() => setShowModal(true)}
			>
				Add Todo
			</button>
			<Modal open={showModal} onClose={() => setShowModal(false)}>
				<AddTodoForm onSuccess={handleAddSuccess} />
			</Modal>
			<SuccessModal open={showSuccess} message="Todo added successfully!" />
			<div className="filters">
				<div className="search-box">
					<input
						type="text"
						placeholder="Search todos..."
						value={searchQuery}
						onChange={handleSearch}
						className="search-input"
					/>
				</div>
				
				<div className="filter-buttons">
					<button
						className={`filter-button ${statusFilter === FILTER_OPTIONS.ALL ? 'active' : ''}`}
						onClick={() => handleFilterChange(FILTER_OPTIONS.ALL)}
					>
						All
					</button>
					<button
						className={`filter-button ${statusFilter === FILTER_OPTIONS.COMPLETED ? 'active' : ''}`}
						onClick={() => handleFilterChange(FILTER_OPTIONS.COMPLETED)}
					>
						Completed
					</button>
					<button
						className={`filter-button ${statusFilter === FILTER_OPTIONS.INCOMPLETE ? 'active' : ''}`}
						onClick={() => handleFilterChange(FILTER_OPTIONS.INCOMPLETE)}
					>
						Incomplete
					</button>
				</div>
			</div>

			<TodoList todos={currentTodos} />
			
			{filteredTodos.length === 0 ? (
				<div className="no-results">No todos found matching your search query</div>
			) : (
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
			)}
		</div>
	);
};

export default AllTodos;
