import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AllTodos from './pages/AllTodos';
import TodoDetails from './pages/TodoDetails';
import AddTodo from './pages/AddTodo';
import TestError from './pages/TestError';
import NotFound from './pages/NotFound';

export default function App() {
	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/todos" element={<AllTodos />} />
				<Route path="/todos/:id" element={<TodoDetails />} />
				<Route path="/add-todo" element={<AddTodo />} />
				<Route path="/test-error" element={<TestError />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}
