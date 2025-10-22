import { Route, Routes } from 'react-router-dom';
import { Home, Todos, TodoDetails, TestError } from './pages';
import Header from './components/Header';
import NotFound from './components/NotFound';

function App() {
	return (
		<>
			<Header />
			<main className='px-3 mb-4 mt-8 sm:px-20 sm:mb-6'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/todos' element={<Todos />} />
					<Route path='/todos/:id' element={<TodoDetails />} />
					<Route path='/test-error' element={<TestError />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</main>
		</>
	);
}

export default App;
