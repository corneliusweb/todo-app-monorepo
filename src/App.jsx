import { Routes, Route } from 'react-router-dom';
import AllTodos from './components/AllTodos';
import TodoDetails from './components/TodoDetails';
import AddTodo from './components/AddTodo';

export default function App() {
	return <>
      <AllTodos />
      <TodoDetails />
      <AddTodo />
   </>
}
